import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import './Listing.css';
import { Modal } from '../../context/Modal';
import ListingModal from '../ListingModal/ListingModal';

const Listing = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <>
        <Link onClick={() => setShowModal(true)}>
          <div className="single-listing">
          <div className="listing-img-container">
            <img className="listing-img" src={listing.preview_image} alt='home'/>
          </div>
          <div className="listing-price">
            ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                {listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sqft
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
        </Link>
      </>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingModal listing={listing}/>
        </Modal>
      )}
    </>
  );
};

export default Listing;
