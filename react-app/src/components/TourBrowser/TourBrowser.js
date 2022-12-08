import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import './TourBrowser.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import * as tourActions from '../../store/tour';
import * as listingActions from '../../store/listing';
import * as tourListingActions from '../../store/tour_listing';
import ListingBrowser from '../ListingBrowser';


const TourBrowser = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const tours = useSelector(state => state.tours);
  const userTours = [];

  for (let key in tours) {
    if (user && tours[key].user_id === user.id) {
      userTours.push(tours[key]);
    }
  }

  console.log("TOURS", tours);
  console.log("USERTOURS", userTours);


  useEffect(() => {
    dispatch(tourActions.loadAllTours());
    dispatch(listingActions.loadAllListings())
  }, [dispatch]);

  return (
    <>
    <div>Tours scheduled:</div>
    {
      tours && userTours && (
        <ul>
          {
            userTours.map(tour => (
              <li className="tour" key={tour.id}>
                <ul>
                  <li>
                    <img src={tour.tour_listing.preview_image} alt="listing"/>
                  </li>
                  <li>
                    {tour.tour_listing.address}
                  </li>
                  <li>
                    {tour.tour_listing.city}
                  </li>
                  <li>
                    {tour.tour_listing.state}
                  </li>
                  <li>
                    {tour.tour_listing.zip_code}
                  </li>
                  <li>
                    Tour Date: {tour.tour_start_date}
                  </li>
                  <li>
                    Tour Time: {tour.tour_time_slot}
                  </li>
                </ul>
              </li>
            ))
          }
        </ul>
      )
    }
    </>
  )
};

export default TourBrowser;
