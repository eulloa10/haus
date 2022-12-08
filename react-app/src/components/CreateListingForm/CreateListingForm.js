import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import * as listingActions from '../../store/listing';
import Listing from '../Listing/Listing';
import LoginFormModal from '../LoginFormModal';
import './CreateListingForm.css';

const CreateListingFormTest = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const allListings = [];

  // useEffect(() => {
  //   dispatch(listingActions.loadAllListings())
  // }, [dispatch]);

  return (
    <>
    {user ?  (<div>create listing test</div>) : (
      <LoginFormModal />
    )
    }
    </>

  );
};

export default CreateListingFormTest;
