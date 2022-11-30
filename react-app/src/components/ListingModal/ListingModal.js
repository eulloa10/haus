import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import './ListingModal.css';
import HeartLogo from '../../assets/Heart.svg';
import DeleteLogo from '../../assets/Hide.svg';
import EditLogo from '../../assets/edit.png';

const ListingModal = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user.id === listing.owner_id) {
      setIsOwned(true);
    }
  });

  // editListingHandler = () => {

  // }



  return (
    <div className="listing-modal">
      <div className="modal-listing-img-container">
        <img className="modal-listing-img" src={listing.preview_image} alt='home'/>
      </div>
      <div className="listing-info-container">
        <div className="listing-options">
          <button className='listing-option-btn'>
            <img className="listing-options-img" src={HeartLogo} alt="favorite"/>
            Save
          </button>
          {
            isOwned && (
              <>
              <button className="edit-listing listing-option-btn" >
                <img className="listing-options-img" src={EditLogo} alt="edit"/>
                Edit
              </button>
              <button className="delete-listing listing-option-btn" >
                <img className="listing-options-img" src={DeleteLogo} alt="delete"/>
                Delete
              </button>
              </>
            )
          }
        </div>
        <div className="listing-price">
          ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
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
          <div>{listing.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
