import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import Map from '../Map';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import CreateListingModal from '../CreateListingModal'
import './ListingBrowser.css';
import * as userTourActions from '../../store/userTours';


const ListingBrowser = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState();
  const [tourView, setTourView] = useState(false);
  const [regularView, setRegularView] = useState(false);
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const userTours = useSelector(state => state.userTours);
  const history = useHistory();
  const allListings = [];
  const userListings = [];
  const tourListings = [];


  for (let key in listings) {
    if (user && listings[key].owner_id === user.id) {
      userListings.push(listings[key]);
    } else {
      allListings.push(listings[key]);
    }
  }
  console.log("USERLISTINGS", userListings)
  console.log("USERTOURS", userTours)

  for (let key in userTours) {
    tourListings.push(userTours[key].tour_listing)
  }

  console.log("TOURLISTINGS", tourListings);
  console.log("TOURVIEW", tourView);
  console.log("REGULARVIEW", regularView);
  console.log("USERLISTINGSONLY", userListingsOnly);

  useEffect(() => {
    dispatch(listingActions.loadAllListings())
    dispatch(userTourActions.loadAllTours());

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

    setLoaded(true);

  }, [dispatch, location.pathname, userListingsOnly, history, tourView, regularView]);

  const userTourView =
        <div className='listing-container'>
          <div className="map-container">
            <Map listing={selectedListing}/>
          </div>
        <div className='listing-box-container-user'>
          {
            tourListings.map(listing => (
              <div className="listing" key={listing.id}>
                <Listing
                  listing={listing}
                />
              </div>
            ))
          }
        </div>
        </div>

  const allListingsView =
    <div className='listing-container'>
      <div className="map-container">
        <Map />
      </div>
      <div className='listing-box-container'>
        {
          allListings.map(listing => (
            <div className="listing" key={listing.id}>
              <Listing
                listing={listing}
              />
            </div>
          ))
        }
    </div>
  </div>

  const userListingView =
          <div className='listing-container'>
            <div className="map-container">
              <Map listing={selectedListing}/>
            </div>
          <div className='listing-box-container-user'>
            <div>
              <CreateListingModal />
            </div>
            {
              userListings.map(listing => (
                <div className="listing" key={listing.id}>
                  <Listing
                    listing={listing}
                  />
                </div>
              ))
            }
          </div>
          </div>

  return (
    <>
    { loaded && tourView && userTourView}
    { loaded && regularView && allListingsView }
    { loaded && userListingsOnly && userListingView}
    </>
  );
};

export default ListingBrowser;
