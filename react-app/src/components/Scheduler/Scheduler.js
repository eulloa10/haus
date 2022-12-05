import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import './Scheduler.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


const Scheduler = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const [value, onChange] = useState(new Date());
  const [tourTime, setTourTime] = useState();

  console.log("VALUE", value)
  console.log("SETTOURTIME", tourTime);

  const minCalOption = new Date();
  minCalOption.setDate(minCalOption.getDate() + 1);
  const maxCalOption = new Date();
  maxCalOption.setDate(maxCalOption.getDate() + 30);

  console.log("MONTHTIMESLOT", maxCalOption)
  console.log("MONTHTIMESLOT", minCalOption)

  return (
    <>
      <div>
        <h4>Select a date:</h4>
        <Calendar onChange={onChange} value={value} minDate={minCalOption} maxDate={maxCalOption}/>
      </div>
      <div>
        <h4>Choose a time slot:</h4>
      </div>
      <table className="scheduler-table">
        <tr className="scheduler-row">
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>9am</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>10am</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>11am</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>12pm</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>1pm</td>
        </tr>
        <tr className="scheduler-row">
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>2pm</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>3pm</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>4pm</td>
          <td className="scheduler-cell" onClick={(e) => setTourTime(e.target.textContent)}>5pm</td>
        </tr>
      </table>
      <button type="submit">Schedule</button>
    </>
  );
};

export default Scheduler;
