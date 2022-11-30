import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import { getUserOwnedListings } from '../../store/userListing';
import './Listing.css';

const Listing = (userListingId) => {
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const userListings = useSelector(state => state.userListings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOwnedListings())
  }, [dispatch]);

  if (!user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    {userListings &&
    <div className="single-listing">
      <div className="listing-img-container">
        <img className="listing-img" src={userListings[1].preview_image} alt='home'/>
      </div>
      <div className="listing-price">
        {userListings[1].price}
      </div>
      <div className="listing-details-container">
        <ul className="listing-details-list">
          <li>
            {userListings[1].beds} bds |
          </li>
          <li>
            {userListings[1].baths} ba |
          </li>
          <li>
            {userListings[1].sqft} sqft
          </li>
          <li>
            - {userListings[1].type} for sale
          </li>
        </ul>
      </div>
      <div className="listing-address-container">
        <ul className="listing-address-list">
            <li>
              {userListings[1].address}
            </li>
            <li>
              {userListings[1].city},
            </li>
            <li>
              {userListings[1].state}
            </li>
            <li>
              {userListings[1].zip_code}
            </li>
          </ul>
      </div>
    </div>
    }
    </>
  );
};

export default Listing;
