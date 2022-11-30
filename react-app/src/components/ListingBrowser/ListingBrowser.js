import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import './ListingBrowser.css';

const ListingBrowser = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const allListings = [];

  // console.log("______LISTINGS_____", listings)

  for (let key in listings) {
    allListings.push(listings[key]);
  }

  // console.log("______ALLLISTINGS_____", allListings)

  useEffect(() => {
    dispatch(listingActions.loadAllListings())
  }, [dispatch]);

  return (
    <>
    { listings &&
      <div>
        {
          allListings.map(listing => (
            <div>
              {console.log("LISTLOOP",listing)}
              <Listing
                listing={listing}
                key={listing.id}
              />
            </div>
          ))
        }
      </div>
    }
    </>

  );
};

export default ListingBrowser;
