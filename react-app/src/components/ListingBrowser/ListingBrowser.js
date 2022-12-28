import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import Map from '../Map';
import CreateListingModal from '../CreateListingModal'
import './ListingBrowser.css';
import * as userTourActions from '../../store/userTours';
import * as userListingActions from '../../store/userListing';


const ListingBrowser = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState();
  const [tourView, setTourView] = useState(false);
  const [regularView, setRegularView] = useState(false);
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const listings = Object.values(useSelector(state => state.listings));
  const userListings = Object.values(useSelector(state => state.userListings));
  const userTours = Object.values(useSelector(state => state.userTours));
  const history = useHistory();

  console.log("USEROWNEDLISTINGS", userListings);
  console.log("USERLISTINGS", userListings);
  console.log("USERTOURS", userTours);

  useEffect(() => {
    dispatch(listingActions.loadAllListings());
    dispatch(userListingActions.getUserOwnedListings());
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

  const userTourView = (<div className='listing-container'>
          <div className="map-container">
            <Map listing={selectedListing}/>
          </div>
        <div className='listing-box-container-user'>
          {
            userTours.map(listing => (
              <div className="listing" key={listing.id}>
                <Listing
                  listing={listing.tour_listing}
                />
              </div>
            ))
          }
        </div>
        </div>);

  const allListingsView = (<div className='listing-container'>
      <div className="map-container">
        <Map />
      </div>
      <div className='listing-box-container'>
        {
          listings.map(listing => (
            <div className="listing" key={listing.id}>
              <Listing
                listing={listing}
              />
            </div>
          ))
        }
    </div>
  </div>);

  const userListingView =
          (<div className='listing-container'>
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
          </div>);

  return (
    <>
    { loaded && tourView && userTourView}
    { loaded && regularView && allListingsView }
    { loaded && userListingsOnly && userListingView}
    </>
  );
};

export default ListingBrowser;
