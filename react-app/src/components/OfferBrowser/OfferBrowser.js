import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import * as imageActions from '../../store/images';
import './OfferBrowser.css';

const OfferBrowser = ({ listing, user }) => {
  const dispatch = useDispatch();
  const [manageOffersView, setManageOffersView] = useState(false);
  const [makeOffersView, setMakeOffersView] = useState(false);
  const listingImages = Object.values(useSelector(state => state.images));
  const [ownedByCurrUser, setOwnedByCurrUser] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/me/listings')) {
      setManageOffersView(true);
    }

    if (user && user.id !== listing.owner_id) {
      setMakeOffersView(true);
    }

  }, [location.pathname, user, listing.owner_id]);

  return (
    <>
    {
      manageOffersView && (
      <h3>Manage Offers Received</h3>
      )
    }
    {
      makeOffersView && (<div>
        This is the make offers view
      </div>)
    }
    </>
  )
}

export default OfferBrowser;
