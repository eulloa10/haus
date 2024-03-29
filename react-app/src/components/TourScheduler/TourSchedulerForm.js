import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import 'react-calendar/dist/Calendar.css';
import * as tourActions from '../../store/tour';
import * as userTourActions from '../../store/userTours';
import './TourScheduler.css';


const TourSchedulerForm = ({ listing, userTours, isOwned, user, hasTour, currentTourInfo, setHasTour, onClose }) => {
  const dispatch = useDispatch();
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState("9am");
  // const [hasTour, setHasTour] = useState(false);
  // const [currentTourInfo, setCurrentTourInfo] = useState(null);
  const [reschedule, setReschedule] = useState(false);


  // useEffect(() => {
  //   for (let key in userTours) {
  //     if (userTours[key].listing_id === listing.id) {
  //       setHasTour(true);
  //       setCurrentTourInfo(userTours[key]);
  //       break;
  //     }
  //   }
  // }, [listing.id, userTours]);

  let minCalOption = new Date();
  minCalOption.setDate(minCalOption.getDate() + 1);
  let maxCalOption = new Date();
  maxCalOption.setDate(maxCalOption.getDate() + 30);

  let minDate = minCalOption.getDate();
  let minMonth = minCalOption.getMonth() + 1;
  let minYear = minCalOption.getFullYear();

  if (minMonth < 10) minMonth = `0${minMonth}`;

  let minDateString = `${minYear}-${minMonth}-${minDate}`

  console.log("MINDATE", minDateString);

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
      <h4 className="select-time-heading">Select a preferred time</h4>
      <div>
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
      <>
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
      { tourDate && tourTime &&
          (<button className="tour-submit-btn" type="submit" onClick={hasTour ? rescheduleTourHandler : bookAppointmentHandler}>Request this time</button>)
      }
    </div>
    </form>);

  return (
    <>
      { user && !isOwned && hasTour && !reschedule && (
        <div className="tour-adjustment-container">
        <h3 className="tour-description-header">Tour Details</h3>
        <ul className="tour-summary">
          <li className="scheduled-tour-detail">
            <div className="scheduled-tour-info">
              <span>
                {currentTourInfo.tour_start_date.split(" ").slice(0,4).join(" ")}
              </span>
              <span>@</span>
              <span>
                {currentTourInfo.tour_time_slot}
              </span>
            </div>
          </li>
        </ul>
        <div className="schedule-options modal-address-description-header">
          <button className="reschedule-tour-btn" onClick={rescheduleButtonHandler}>Reschedule</button>
          <button className="cancel-tour-btn" onClick={cancelTourHandler}>Cancel tour</button>
        </div>
        </div>
      )}
      { user && !isOwned && !hasTour &&
        (
        <div>
          <div className="modal-sched-header">
            <h2 className="schedule-heading">Tour with a Buyer's Agent</h2>
            <button className="close-modal-btn" onClick={() => onClose()}>
              X
            </button>
          </div>
          <div className="schedule-form-container">
          {scheduleForm}
          </div>
          <img className="tour-modal-preview-img" src={listing.preview_image} alt="listing preview"/>
        </div>
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

export default TourSchedulerForm;
