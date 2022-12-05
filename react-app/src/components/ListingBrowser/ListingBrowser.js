import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import Map from '../Map';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import CreateListingModal from '../CreateListingModal'
import './ListingBrowser.css';

const ListingBrowser = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const allListings = [];
  const userListings = [];

  for (let key in listings) {
    if (user && listings[key].owner_id === user.id) {
      userListings.push(listings[key]);
    } else {
      allListings.push(listings[key]);
    }
  }

  const openModal = () =>  {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(listingActions.loadAllListings())

    if (location.pathname.includes('me')) {
      setUserListingsOnly(true);
      setLoaded(true);
    }

  }, [dispatch, location.pathname, userListingsOnly]);

  return (
    <>

      {
        loaded && location.pathname && listings && userListingsOnly ? (<>
              <div className='listing-container'>
                <div className="map-container">
                  <Map listing={selectedListing}/>
                </div>
              <div className='listing-box-container-user'>
                <NavLink to="/me/listings/create" className="add-listing" onClick={openModal}>
                  Add new listing
                </NavLink>
                {
                  userListings.map(listing => (
                    <div className="listing">
                      <Listing
                        listing={listing}
                        key={listing.id}
                      />
                    </div>
                  ))
                }
              </div>
              </div>
              {showModal && (
                <Modal onClose={closeModal}>
                  <CreateListingModal />
                </Modal>)}
                </>
        ) : (
                <div className='listing-container'>
                <div className="map-container">
                  <Map />
                </div>
                <div className='listing-box-container'>
                  {
                    allListings.map(listing => (
                      <div className="listing">
                        <Listing
                          listing={listing}
                          key={listing.id}
                        />
                      </div>
                    ))
                  }
              </div>
              </div>
        )
      }

    </>
  );
};

export default ListingBrowser;
