import React, { useState, useEffect } from 'react';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import './Listing.css';
import { Modal } from '../../context/Modal';
import ListingModal from '../ListingModal/ListingModal';
import OfferBrowser from '../OfferBrowser/OfferBrowser';

const Listing = ({listing}) => {
  const [showModal, setShowModal] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [tourView, setTourView] = useState(false);
  const [regularView, setRegularView] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  }

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    history.goBack();
  }

  useEffect(() => {
    if (location.pathname.includes('/me/listings')) {
      setUserListingsOnly(true);
    } else {
      setUserListingsOnly(false);
    }

    if (location.pathname.includes('/me/tours')) {
      setTourView(true);
    } else {
      setTourView(false);
    }

    if (tourView === false && userListingsOnly === false) {
      setRegularView(true);
    } else {
      setRegularView(false);
    }
  }, [location.pathname, tourView, userListingsOnly]);

  const listingCard =
  <div className="listing-card">
  <div className="listing-img-container">
    <img className="listing-img" src={listing.preview_image} alt='home'/>
  </div>
  <div className="listing-details-container">
    <h3 className="listing-price">
      ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    </h3>
    <ul className="listing-details-list">
      <li className="listing-detail">
        {listing.beds} bds |
      </li>
      <li className="listing-detail">
        {listing.baths} ba |
      </li>
      <li className="listing-detail">
        {listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sqft
      </li>
      <li className="listing-detail">
        - {listing.type} for sale
      </li>
    </ul>
    <div className="listing-address-container">
      <ul className="listing-address-list">
          <li className="listing-address-detail">
            {listing.address},
          </li>
          <li className="listing-address-detail">
            {listing.city},
          </li>
          <li className="listing-address-detail">
            {listing.state}
          </li>
          <li className="listing-address-detail">
            {listing.zip_code}
          </li>
        </ul>
    </div>
  </div>
</div>

  return (
    <>
      <>
      {
        tourView && (
          <NavLink to={`/me/tours/listings/${listing.id}`} onClick={openModal}>
            {listingCard}
          </NavLink>
        )
      }
      {
        userListingsOnly && (
          <NavLink to={`/me/listings/${listing.id}`} onClick={openModal}>
            {listingCard}
          </NavLink>
        )
      }
      {
        regularView && (
          <NavLink to={`/listings/${listing.id}`} onClick={openModal}>
            {listingCard}
          </NavLink>
        )
      }
      </>
      {showModal && (
        <Modal onClose={closeModal} children= {<ListingModal listing={listing}/>}>
        </Modal>
      )}
    </>
  );
};

export default Listing;
