import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useLocation } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import Map from '../Map';
import './ListingBrowser.css';

const ListingBrowser = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState();
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const allListings = [];
  const userListings = [];

  for (let key in listings) {
    if (user && listings[key].owner_id === user.id) {
      userListings.push(listings[key]);
    }
    allListings.push(listings[key]);
  }

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
        loaded && location.pathname && listings && userListingsOnly ? (

              <div className='listing-container'>
                <div className="map-container">
                  <Map listing={selectedListing}/>
                </div>
              <div className='listing-box-container'>
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
