import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { getUserOwnedListings } from '../../store/userListing';
import './Listing.css';

const Listing = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);

  return (
    <div className="single-listing">
      <div className="listing-img-container">
        <img className="listing-img" src={listing.preview_image} alt='home'/>
      </div>
      <div className="listing-price">
        {listing.price}
      </div>
      <div className="listing-details-container">
        <ul className="listing-details-list">
          <li>
            {listing.beds} bds |
          </li>
          <li>
            {listing.baths} ba |
          </li>
          <li>
            {listing.sqft} sqft
          </li>
          <li>
            - {listing.type} for sale
          </li>
        </ul>
      </div>
      <div className="listing-address-container">
        <ul className="listing-address-list">
            <li>
              {listing.address}
            </li>
            <li>
              {listing.city},
            </li>
            <li>
              {listing.state}
            </li>
            <li>
              {listing.zip_code}
            </li>
          </ul>
      </div>
    </div>
  );
};

export default Listing;
