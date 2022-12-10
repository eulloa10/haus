import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useLocation, useHistory } from 'react-router-dom';
import './ListingModal.css';
// import HeartLogo from '../../assets/Heart.svg';
import DeleteLogo from '../../assets/Hide.svg';
import EditLogo from '../../assets/edit.png';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import * as listingActions from '../../store/listing';
import * as userTourActions from '../../store/userTours';
import * as tourActions from '../../store/tour';
import Scheduler from '../Scheduler';
import CreateListingModal from '../CreateListingModal';

const ListingModal = ({listing}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [hasTour, setHasTour] = useState(false);
  const user = useSelector(state => state.session.user);
  const userTours = useSelector(state => state.userTours);
  const [showModal, setShowModal] = useState(false);
  const [tourInfo, setTourInfo] = useState(null);
  const location = useLocation();


  useEffect(() => {
    if (user && (user.id === listing.owner_id)) {
      setIsOwned(true);
    }

    if (location.pathname.includes('/me/listings')) {
      setUserListingsOnly(true);
    }

    for (let key in userTours) {
      if (userTours[key].listing_id === listing.id) {
        setTourInfo(userTours[key]);
        setHasTour(true);
        break;
      }
    }

    dispatch(userTourActions.loadAllTours());

  }, [dispatch, listing, location, user, hasTour, tourInfo]);

  console.log("USERTOURS", userTours);
  console.log("TOURINFO", tourInfo);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(listingActions.deleteUserListing(listing.id));
    // <Redirect to="/me/listings"/>
    history.goBack();
  }

  const cancelTourHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(tourActions.deleteUsertour(tourInfo.id))

    if (res) {
      history.push(`/listings/${listing.id}`);
    }
  }

  const closeModal = () => {
    setShowModal(false);
    // history.push(`${match.url}/${listing.id}`);
  }


  return (
    <div className="listing-modal">
      <div className="modal-listing-img-container">
        <img className="modal-listing-img" src={listing.preview_image} alt='home'/>
      </div>
      <div className="listing-info-container">
        <div className="listing-options">
          {
            isOwned && (
              <>
              <div className="edit-listing listing-option-btn">
                <EditListingModal listing={listing}/>
              </div>
              <button className="delete-listing listing-option-btn" onClick={deleteHandler}>
                <img className="listing-options-img" src={DeleteLogo} alt="delete"/>
                Delete
              </button>
              </>
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
          <h3 className="modal-address-description-header">Overview</h3>
          <div className="modal-address-description">
            {listing.description}
          </div>
          { !isOwned && user &&
            (<>
            {!hasTour && (
            <>
             <h3>Schedule a tour</h3>
             <div>
               <Scheduler listing={listing} tourInfo={tourInfo}/>
             </div>
            </>
            )}
            {hasTour && (
              <>
              <h3 className="modal-address-description-header">Tour Scheduled</h3>
              <ul className="tour-summary">
                <li className="scheduled-tour-detail">
                  <span>{tourInfo.tour_start_date}</span>
                  <span>@</span>
                  <span> {tourInfo.tour_time_slot}</span>
                </li>
              </ul>
              <div className="schedule-options modal-address-description-header">
                <button onClick={() => setHasTour(!hasTour)}>Reschedule</button>
                <button onClick={cancelTourHandler}>Cancel tour</button>
              </div>
              </>
            )}
            </>)
          }
        </div>
        {showModal && (
        <Modal onClose={closeModal}>
          <EditListingModal onClose={closeModal} listing={listing}/>
        </Modal>
      )}
    </div>
  );
};

export default ListingModal;
