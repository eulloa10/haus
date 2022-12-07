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
import * as userTourActions from '../../store/userTours'
import Scheduler from '../Scheduler';

const ListingModal = ({listing}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const user = useSelector(state => state.session.user);
  const userTours = useSelector(state => state.userTours);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (user && (user.id === listing.owner_id)) {
      setIsOwned(true);
    }

    if (location.pathname.includes('me')) {
      setUserListingsOnly(true);
    }

    dispatch(userTourActions.loadAllTours());


  }, [dispatch, listing.owner_id, location.pathname, user, history]);

  console.log("USERTOURS", userTours);

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(listingActions.deleteUserListing(listing.id));
    <Redirect to="/listings"/>
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
          {/* { !isOwned &&
            (<button className='listing-option-btn'>
              <img className="listing-options-img" src={HeartLogo} alt="favorite"/>
              Save
            </button>)
          } */}
          {
            isOwned && (
              <>
              <NavLink to={userListingsOnly ? `/me/listings/${listing.id}/edit`: `/listings/${listing.id}/edit`} onClick={() => setShowModal(true)} className="edit-listing listing-option-btn">
                  <img className="listing-options-img" src={EditLogo} alt="edit"/>
                  <span>Edit</span>
              </NavLink>
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
             <h3>Schedule a tour</h3>
             <div>
               <Scheduler listing={listing}/>
             </div>
            </>)
          }
        </div>
        {showModal && (
        <Modal onClose={closeModal}>
          <EditListingModal listing={listing}/>
        </Modal>
      )}
    </div>
  );
};

export default ListingModal;
