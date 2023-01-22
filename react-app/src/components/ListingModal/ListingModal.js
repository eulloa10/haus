import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import './ListingModal.css';
import DeleteLogo from '../../assets/Hide.svg';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import Scheduler from '../Scheduler/Scheduler';
import Favorites from '../Favorites';
import * as listingActions from '../../store/listing';
import * as userListingActions from '../../store/userListing';
import * as userTourActions from '../../store/userTours';
import UploadPicture from '../UploadPicture';
import ImageBrowser from '../ImageBrowser';
import OfferBrowser from '../OfferBrowser/OfferBrowser';
import HouseLogo from '../../assets/house_letter.png';
import redDot from '../../assets/red_circle.png';
import homeType from '../../assets/home_type.svg';
import priceSqft from '../../assets/price_sqft.svg';


const ListingModal = ({ listing, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOwned, setIsOwned] = useState(false);
  const user = useSelector(state => state.session.user);
  const userTours = Object.values(useSelector(state => state.userTours));
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(userTourActions.loadAllTours());
    dispatch(userListingActions.getUserOwnedListings());
    // dispatch(listingActions.loadAllListings());
 }, [dispatch])

  useEffect(() => {
    if (user && (user.id === listing.owner_id)) {
      setIsOwned(true);
    }
  }, [listing, location, user]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(listingActions.deleteUserListing(listing.id)).then(() => dispatch(userListingActions.removeUserListing(listing.id)));

    if (res) {
      onClose();
    }
  }

  return (
    <div className="listing-modal">
      <div className="modal-listing-img-container">
        <ImageBrowser listing={listing} user={user}/>
      </div>
      <div className="listing-info-container">
        <div className="listing-options">
          <div className="listing-logo-container">
            <img className="listing-logo-img" src={HouseLogo} alt='Haus Logo'/>
            <span className="listing-logo-name">
              Haus
            </span>
          </div>
          {
            isOwned && (
              <div className="listing-actions">
                <div>
                  <EditListingModal listing={listing}/>
                </div>
                <button className="delete-listing-btn" onClick={deleteHandler}>
                  {/* <img className="delete-listing-btn-img" src={DeleteLogo} alt="delete"/> */}
                  <span className='delete-listing-btn-text'>DELETE</span>
                </button>
              </div>
            )
        }
        {
          user && !isOwned && (
            <div className="fav-listing-option">
              <Favorites listing={listing} user={user}/>
            </div>
          )
        }
        </div>
        <div className="listing-specs">
          <span className="listing-modal-price">
            ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="modal-spec">
            {listing.beds}
          </span>
          <span>
            bd
          </span>
          <span className="modal-divider">
            |
          </span>
          <span className="modal-spec">
            {listing.baths}
          </span>
          <span>
            ba
          </span>
          <span className="modal-divider">
            |
          </span>
          <span className="modal-spec">
            {listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span>
            sqft
          </span>
        </div>
          <ul className="modal-address-list">
            <li className="modal-address">
              {listing.address},
            </li>
            <li className="modal-address">
              {listing.city},
            </li>
            <li className="modal-address">
              {listing.state}
            </li>
            <li>
              {listing.zip_code}
            </li>
          </ul>
          <div className="sale-status-container">
            <img className="sale-status-img" src={redDot} alt="sale status indicator"/>
            {isOwned ? (<span className="sale-status-description">For sale - listed by you</span>) : <span className="sale-status-description">For sale</span>}
          </div>
          {
            !isOwned && (<button className="tour-sched-btn">
              Request a tour
            </button>)
          }
          <div className="listing-addl-info-container">
          <div className="listing-info-nav-container">
            <ul className="listing-info-nav">
              <a href="#overview" className="listing-info-nav-item">
                Overview
              </a>
              {
                !isOwned && (<a href="#tours" className="listing-info-nav-item">
                  Tours
                </a>)
              }
              <a href="#offers" className="listing-info-nav-item">
                Offers
              </a>
            </ul>
          </div>
        </div>
        <ul className="listing-detail-icons-container">
          <li className="listing-detail-item">
            <img className="listing-detail-item-img" src={homeType} alt="home type icon"/>
            <span>{listing.type}</span>
          </li>
          <li className="listing-detail-item pricesqft">
            <img className="listing-detail-item-img" src={priceSqft} alt="price sqft icon"/>
            <span>${Math.round(listing.price/listing.sqft)} price/sqft</span>
          </li>
          <li className="listing-detail-item">

          </li>

        </ul>
          <h3 id="overview" className="modal-address-description-header">Overview</h3>
          <div className="modal-address-description">
            {listing.description}
          </div>
        {/* <OfferBrowser listing={listing} user={user}/> */}
        <Scheduler id="tours" listing={listing} userTours={userTours} isOwned={isOwned} user={user}/>
        </div>
        {showModal && (
        <Modal onClose={onClose}>
          <EditListingModal onClose={onClose} listing={listing}/>
        </Modal>
      )}
    </div>
  );
};

export default ListingModal;
