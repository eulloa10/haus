import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import './Scheduler.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import * as tourActions from '../../store/tour';


const Scheduler = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [tourDate, setTourDate] = useState();
  const [tourTime, setTourTime] = useState();
  const [futureDate, setFutureDate] = useState(false);

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
      .catch(async (res) => {
        const data = await res.json();
        console.log("DATA ERRORS", data.errors)
        // if (data.errors) setErrors({...data.errors});
      });


    if (res) {
      console.log("RES RECEIVED")
      // history.goBack();
      // setShowModal(false);
      // history.push(`${match.url}/${listing.id}`)
    }
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
            // placeholder={<Calendar onChange={onChange} value={tourDate} minDate={minCalOption} maxDate={maxCalOption}/>}
          />
        </div>
        {tourDate && (<>
          <h4>Select a time</h4>
          <span>
            <select id="time" name="time" required onChange={(e) => setTourTime(e.target.value)}>
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
            (<button type="submit" onClick={bookAppointmentHandler}>Schedule</button>)
        }
      </form>
    </>
  );
};

export default Scheduler;
