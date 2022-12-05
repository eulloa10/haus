import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import './Listing.css';
import { Modal } from '../../context/Modal';
import ListingModal from '../ListingModal/ListingModal';

const Listing = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const openModal = () => {
    setShowModal(true);
    // console.log("MATCHOPEN", match);
  }

  const closeModal = () => {
    setShowModal(false);
    // console.log("MATCHCLOSE", match);
    history.goBack();

  }

  useEffect(() => {
    if (location.pathname.includes('me')) {
      setUserListingsOnly(true);
    }
    // console.log("SHOWMODAL1", showModal)
  }, [location.pathname]);

  // console.log("SHOWMODAL2", showModal)


  return (
    <>
      <>
        <NavLink to={ userListingsOnly ? `/me/listings/${listing.id}` : `/listings/${listing.id}`} onClick={openModal}>
          <div className="listing-card">
            <div className="listing-img-container">
              <img className="listing-img" src={listing.preview_image} alt='home'/>
            </div>
            <div className="listing-details-container">
              <h3 className="listing-price">
                ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>
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
              </div>
            </div>
          </div>
        </NavLink>
      </>
      {showModal && (
        <Modal onClose={closeModal} children={<ListingModal listing={listing}/>}>
        </Modal>
      )}
    </>
  );
};

export default Listing;
