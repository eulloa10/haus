import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './Scheduler.css';
import 'react-calendar/dist/Calendar.css';
import * as tourActions from '../../store/tour';
import * as userTourActions from '../../store/userTours';


const Scheduler = ({ listing, userTours, isOwned, user }) => {
  const dispatch = useDispatch();
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState("9am");
  const [hasTour, setHasTour] = useState(false);
  const [currentTourInfo, setCurrentTourInfo] = useState(null);
  const [reschedule, setReschedule] = useState(false);

  // console.log("USERTOURS", userTours);

  useEffect(() => {
    for (let key in userTours) {
      if (userTours[key].listing_id === listing.id) {
        setHasTour(true);
        setCurrentTourInfo(userTours[key]);
        break;
      }
    }
  }, [listing.id, userTours]);

  let minCalOption = new Date();
  minCalOption.setDate(minCalOption.getDate() + 1);
  let maxCalOption = new Date();
  maxCalOption.setDate(maxCalOption.getDate() + 30);

  let minDate = minCalOption.getDate();
  let minMonth = minCalOption.getMonth() + 1;
  let minYear = minCalOption.getFullYear();
  let minDateString = `${minYear}-${minMonth}-${minDate}`

  // let today = new Date();
  // const time = today.toLocaleString("en-US", {
  //   timeZone: "America/Los_Angeles"
  // });
  // console.log("TODAY", today)
  // console.log("TIME", time)

  const bookAppointmentHandler = async (e) => {
    e.preventDefault();

    const tourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(tourActions.addUsertour(listing.id, tourData)).then(() => dispatch(userTourActions.loadAllTours()));
  }

  const rescheduleTourHandler = async (e) => {
    e.preventDefault();

    let updatedTourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(userTourActions.editSingleUserTour(currentTourInfo.id, updatedTourData)).then(() => dispatch(userTourActions.loadAllTours())).then(() => setReschedule(false))
  }

  const rescheduleButtonHandler = (e) => {
    e.preventDefault();
    setReschedule(true);
  }

  const cancelTourHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(userTourActions.deleteUserTour(currentTourInfo.id)).then(() => dispatch(userTourActions.loadAllTours())).then(() => setHasTour(false));
  }

  const scheduleForm =
    (<form className="schedule-form">
      <div>
        <h4>Select a date</h4>
        <input
          name="tourDate"
          type="date"
          value={tourDate}
          onChange={(e) => setTourDate(e.target.value)}
          min={minDateString}
          className="calendar"
          required
        />
      </div>
      <div className="time-submit">
      {tourDate && (<>
        <h4>Select a time</h4>
        <span>
          <select id="time" name="time" required onChange={(e) => setTourTime(e.target.value)} defaultValue="9am" className="time-selector">
            <option>9am</option>
            <option>10am</option>
            <option>11am</option>
            <option>12pm</option>
            <option>1pm</option>
            <option>2pm</option>
            <option>3pm</option>
            <option>4pm</option>
            <option>5pm</option>
            <option>6pm</option>
          </select>
        </span>
      </>
      )}
      { tourDate && tourTime &&
          (<button className="tour-submit-btn" type="submit" onClick={hasTour ? rescheduleTourHandler : bookAppointmentHandler}>Schedule</button>)
      }
    </div>
    </form>);

  return (
    <>
      { user && !isOwned && hasTour && !reschedule && (
        <>
        <h3 className="modal-address-description-header">Tour Scheduled</h3>
        <ul className="tour-summary">
          <li className="scheduled-tour-detail">
            <div className="scheduled-tour-info">
              <span>{currentTourInfo.tour_start_date}</span>
              <span>@</span>
              <span> {currentTourInfo.tour_time_slot}</span>
            </div>
          </li>
        </ul>
        <div className="schedule-options modal-address-description-header">
          <button className="reschedule-tour-btn" onClick={rescheduleButtonHandler}>Reschedule</button>
          <button className="cancel-tour-btn" onClick={cancelTourHandler}>Cancel tour</button>
        </div>
        </>
      )}
      { user && !isOwned && !hasTour &&
        (
        <>
        <h3 className="schedule-heading">Schedule a tour</h3>
        {scheduleForm}
        </>
        )
      }
      { user && !isOwned && hasTour && reschedule && (
        <div className="schedule-form">
          <h3>Reschedule your tour:</h3>
          {scheduleForm}
        </div>
      )}
    </>
  );
};

export default Scheduler;
