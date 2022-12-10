import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import './Scheduler.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import * as tourActions from '../../store/tour';
import * as userTourActions from '../../store/userTours';



const Scheduler = ({ listing, tourInfo, tourChanged, reschedule }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState("9am");
  const [isReschedule, setIsReschedule] = useState(reschedule);
  const [loaded, setLoaded] = useState(false);


  useEffect (() => {

  }, [])

  console.log("TOURDATEOUT", tourDate)
  console.log("TOURTIMEOUT", tourTime);

  let minCalOption = new Date();
  minCalOption.setDate(minCalOption.getDate() + 1);
  let maxCalOption = new Date();
  maxCalOption.setDate(maxCalOption.getDate() + 30);

  let minDate = minCalOption.getDate();
  let minMonth = minCalOption.getMonth() + 1;
  let minYear = minCalOption.getFullYear();
  let minDateString = `${minYear}-${minMonth}-${minDate}`

  console.log("MINDATESTRING", minDateString);

  const bookAppointmentHandler = async (e) => {
    e.preventDefault();

    const tourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(tourActions.addUsertour(listing.id, tourData))

  }

  const rescheduleTourHandler = async (e) => {
    e.preventDefault();

    let updatedTourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(tourActions.editUsertour(tourInfo.id, updatedTourData))


  }

  return (
    <>
      <form>
        <div>
          <h4>Select a date</h4>
          <input
            name="tourDate"
            type="date"
            value={tourDate}
            onChange={(e) => setTourDate(e.target.value)}
            min={minDateString}
            required
          />
        </div>
        {tourDate && (<>
          <h4>Select a time</h4>
          <span>
            <select id="time" name="time" required onChange={(e) => setTourTime(e.target.value)} defaultValue="9am">
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
            (<button type="submit" onClick={isReschedule ? rescheduleTourHandler : bookAppointmentHandler}>Schedule</button>)
        }
      </form>
    </>
  );
};

export default Scheduler;
