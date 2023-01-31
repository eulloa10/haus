import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import './ListingModal.css';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import Favorites from '../Favorites';
import * as listingActions from '../../store/listing';
import * as userListingActions from '../../store/userListing';
import * as userTourActions from '../../store/userTours';
import ImageBrowser from '../ImageBrowser';
import OfferBrowser from '../OfferBrowser/OfferBrowser';
import HouseLogo from '../../assets/house_letter.png';
import redDot from '../../assets/red_circle.png';
import homeType from '../../assets/home_type.svg';
import priceSqft from '../../assets/price_sqft.svg';
import trashListing from '../../assets/trash_can_listing.svg';
import TourSchedulerModal from '../TourScheduler';
import ImageUploadModal from '../ImageUpload';


const ListingModal = ({ listing, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOwned, setIsOwned] = useState(false);
  const [hasTour, setHasTour] = useState(false);
  const [currentTourInfo, setCurrentTourInfo] = useState(null);
  const user = useSelector(state => state.session.user);
  const userTours = Object.values(useSelector(state => state.userTours));
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(userTourActions.loadAllTours());
    dispatch(userListingActions.getUserOwnedListings());
 }, [dispatch])

  useEffect(() => {
    if (user && (user.id === listing.owner_id)) {
      setIsOwned(true);
    }
  }, [listing, location, user]);

  useEffect(() => {
    for (let key in userTours) {
      if (userTours[key].listing_id === listing.id) {
        setHasTour(true);
        setCurrentTourInfo(userTours[key]);
        break;
      }
    }
  }, [listing.id, userTours]);

  console.log("CURRENTTOURINFO", currentTourInfo)

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
                <ImageUploadModal listingId={listing.id} isOwned={isOwned}/>
                <EditListingModal listing={listing}/>
                <button className="delete-listing-btn" onClick={deleteHandler}>
                  <img className="trash-listing-img" src={trashListing} alt="delete listing" />
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
        <div className="listing-top-container">
          <div className="listing-specs">
            <span className="listing-modal-price">
              ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <div className="bed-bath-sqft-container">
              <span className="modal-spec divider-adj">
                {listing.beds}
              </span>
              <span className="modal-divider">
                bd
              </span>
              <span className="modal-spec">
                {listing.baths}
              </span>
              <span className="modal-divider">
                ba
              </span>
              <span className="modal-spec">
                {listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span>
                sqft
              </span>
            </div>
          </div>
            <ul className="modal-address-list">
              <li>
                {listing.address},
              </li>
              <li className="modal-address-spacing">
                {listing.city},
              </li>
              <li className="modal-address-spacing">
                {listing.state}
              </li>
              <li className="modal-address-spacing">
                {listing.zip_code}
              </li>
            </ul>
            <div className="sale-status-container">
              <img className="sale-status-img" src={redDot} alt="sale status indicator"/>
              {isOwned ? (<span className="sale-status-description">For sale - listed by you</span>) : <span className="sale-status-description">For sale</span>}
            </div>
          </div>
          {
            user && !isOwned && <TourSchedulerModal listing={listing} userTours={userTours} isOwned={isOwned} user={user} hasTour={hasTour} currentTourInfo={currentTourInfo} setHasTour={setHasTour}/>
          }
          <div className="subsection-container">
          <div className="listing-addl-info-container">
            <span className="listing-scroll-spacing">
            </span>
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
            <span className="listing-detail-item-text">{listing.type}</span>
          </li>
          <li className="listing-detail-item">
            <img className="listing-detail-item-img pricesqft" src={priceSqft} alt="price sqft icon"/>
            <span className="listing-detail-item-text">${Math.round(listing.price/listing.sqft)} price/sqft</span>
          </li>
        </ul>
        <div className="listing-bottom-container">
          <div className="overview-container">
            <h2 id="overview" className="bottom-header-text">Overview</h2>
            <div className="overview-description">
              {listing.description}
            </div>
          </div>
          <div className="tour-container">
            <h2 id="tours" className="bottom-header-text">Tours Scheduled</h2>
            <div className="tour-container-info">
              {!isOwned && hasTour && (
              <span>
                {currentTourInfo.tour_start_date}
              </span>)
              }
              {!isOwned && !hasTour && (<span>No Tour Scheduled</span>)
              }
            </div>
          </div>
          <div className="offers-container">
            <h2 id="offers" className="bottom-header-text">Offers</h2>
            <div className="offer-container-info">
              Offer component goes here
            </div>
          </div>
        </div>
        </div>
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
