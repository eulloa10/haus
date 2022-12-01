import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import './EditListingModal.css';
import ListingModal from '../ListingModal/ListingModal';
import * as listingActions from '../../store/listing';

const EditListingModal = ({listing}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const [address, setAddress] = useState(listing.address);
  const [city, setCity] = useState(listing.city);
  const [state, setState] = useState(listing.state);
  const [zipCode, setZipCode] = useState(listing.zip_code);
  const [country, setCountry] = useState(listing.country);
  const [lat, setLat] = useState(listing.lat);
  const [lng, setLng] = useState(listing.lng);
  const [description, setDescription] = useState(listing.description);
  const [type, setType] = useState(listing.type);
  const [beds, setBeds] = useState(listing.beds);
  const [baths, setBaths] = useState(listing.baths);
  const [sqft, setSqft] = useState(listing.sqft);
  const [price, setPrice] = useState(listing.price);
  const [previewImage, setPreviewImage] = useState(listing.preview_image);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(true);

  const editListingHandler = async (e) => {
    e.preventDefault();
    const updatedListingData = {
      address,
      city,
      state,
      zip_code: zipCode,
      country,
      lat,
      lng,
      description,
      type,
      beds,
      baths,
      sqft,
      price,
      preview_image: previewImage
    };

    const res = await dispatch(listingActions.editUserListing(listing.id, updatedListingData))
      .catch(async (res) => {
        const data = await res.json();
        // if (data.errors) setErrors({...data.errors});
      });

    // if (res) history.push(`/user/spots`)
    if (res) {
      setShowModal(false);
    }
  }

  const updateAddress = (e) => {
    setAddress(e.target.value);
  }

  const updateCity = (e) => {
    setCity(e.target.value);
  }

  const updateState = (e) => {
    setState(e.target.value);
  }

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  }

  const updateCountry = (e) => {
    setCountry(e.target.value);
  }

  const updateLat = (e) => {
    setLat(e.target.value);
  }

  const updateLng = (e) => {
    setLng(e.target.value);
  }

  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  const updateType = (e) => {
    setType(e.target.value);
  }

  const updateBeds = (e) => {
    setBeds(e.target.value);
  }

  const updateBaths = (e) => {
    setBaths(e.target.value);
  }

  const updateSqft = (e) => {
    setSqft(e.target.value);
  }

  const updatePrice = (e) => {
    setPrice(e.target.value);
  }

  const updatePreviewImage = (e) => {
    setPreviewImage(e.target.value);
  }



  return (
    <>
    {showModal ?
    (<div className='edit-listing-container'>
      <h3>Edit listing information</h3>
      <form className='edit-form' onSubmit={editListingHandler}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='address'>Address</label>
          <input
            name='address'
            type='text'
            placeholder={listing.address}
            value={address}
            onChange={updateAddress}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='city'>City</label>
          <input
            name='city'
            type='text'
            placeholder={listing.city}
            value={city}
            onChange={updateCity}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='state'>State</label>
          <input
            name='password'
            type='text'
            placeholder={listing.state}
            value={state}
            onChange={updateState}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='zipCode'>Zip Code</label>
          <input
            name='zipCode'
            type='number'
            placeholder={listing.zip_code}
            value={zipCode}
            onChange={updateZipCode}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='country'>Country</label>
          <input
            name='country'
            type='text'
            placeholder={listing.country}
            value={country}
            onChange={updateCountry}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='lat'>Lat</label>
          <input
            name='lat'
            type='number'
            placeholder={listing.lat}
            value={lat}
            onChange={updateLat}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='lng'>Lng</label>
          <input
            name='lng'
            type='number'
            placeholder={listing.lng}
            value={lng}
            onChange={updateLng}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label'  htmlFor='type'>Type</label>
          <input
            name='type'
            type='text'
            placeholder={listing.type}
            value={type}
            onChange={updateType}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='beds'>Beds</label>
          <input
            name='beds'
            type='number'
            placeholder={listing.beds}
            value={beds}
            onChange={updateBeds}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='baths'>Baths</label>
          <input
            name='baths'
            type='number'
            placeholder={listing.baths}
            value={baths}
            onChange={updateBaths}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='sqft'>Sqft</label>
          <input
            name='sqft'
            type='number'
            placeholder={listing.sqft}
            value={sqft}
            onChange={updateSqft}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='price'>Price</label>
          <input
            name='price'
            type='number'
            placeholder={listing.price}
            value={price}
            onChange={updatePrice}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='previewImage'>Preview Image</label>
          <input
            name='previewImage'
            type='url'
            placeholder={listing.preview_image}
            value={previewImage}
            onChange={updatePreviewImage}
            className='edit-listing-input'
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='description'>Description</label>
          <textarea
            name='description'
            type='text'
            placeholder={listing.description}
            value={description}
            onChange={updateDescription}
            className='description-edit-input'
          />
        </div>
        <button className='submit-edit-btn' type='submit'>Submit Changes</button>
      </form>
    </div>) : (<ListingModal listing={listing}/>)}
    </>
)};

export default EditListingModal;
