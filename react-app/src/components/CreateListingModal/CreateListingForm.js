import React, { useState, useContext } from 'react';
import {  useDispatch } from 'react-redux'
import {  Redirect, useHistory } from 'react-router-dom';
import './CreateListingModal.css';
import ListingModal from '../ListingModal/ListingModal';
import ListingBrowser from '../ListingBrowser';
import * as listingActions from '../../store/listing';


const CreateListingForm = ({onClose}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [beds, setBeds] = useState();
  const [baths, setBaths] = useState();
  const [sqft, setSqft] = useState();
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState();
  // const [value, setValue] = useState(showModal);
  const history = useHistory();


  const addListingHandler = async (e) => {
    e.preventDefault();
    const newListingData = {
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

    const res = await dispatch(listingActions.addUserListing(newListingData))
      .then(() => {onClose()}).catch(async (res) => {
        const data = await res.json();
        // if (data.errors) setErrors({...data.errors});
      });

    if (res) {
      // setShowModal(false);
      // setValue(false);
      // history.goBack();
      // history.push('/me/listings');

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
    <div className='edit-listing-container'>
      <h3>Enter listing information</h3>
      <form className='edit-form' onSubmit={addListingHandler}>
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
            placeholder='Address'
            value={address}
            onChange={updateAddress}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='city'>City</label>
          <input
            name='city'
            type='text'
            placeholder='City'
            value={city}
            onChange={updateCity}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='state'>State</label>
          <input
            name='password'
            type='text'
            placeholder='State'
            value={state}
            onChange={updateState}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='zipCode'>Zip Code</label>
          <input
            name='zipCode'
            type='number'
            placeholder='Zip Code'
            value={zipCode}
            onChange={updateZipCode}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='country'>Country</label>
          <input
            name='country'
            type='text'
            placeholder='Country'
            value={country}
            onChange={updateCountry}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='lat'>Lat</label>
          <input
            name='lat'
            type='number'
            placeholder='Latitude'
            value={lat}
            onChange={updateLat}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='lng'>Lng</label>
          <input
            name='lng'
            type='number'
            placeholder='Longitude'
            value={lng}
            onChange={updateLng}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label'  htmlFor='type'>Type</label>
          <input
            name='type'
            type='text'
            placeholder='Listing Type'
            value={type}
            onChange={updateType}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='beds'>Beds</label>
          <input
            name='beds'
            type='number'
            placeholder='Beds'
            value={beds}
            onChange={updateBeds}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='baths'>Baths</label>
          <input
            name='baths'
            type='number'
            placeholder='Baths'
            value={baths}
            onChange={updateBaths}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='sqft'>Sqft</label>
          <input
            name='sqft'
            type='number'
            placeholder='Sqft'
            value={sqft}
            onChange={updateSqft}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='price'>Price</label>
          <input
            name='price'
            type='number'
            placeholder='Price'
            value={price}
            onChange={updatePrice}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='previewImage'>Preview Image</label>
          <input
            name='previewImage'
            type='url'
            placeholder='Preview Image URL'
            value={previewImage}
            onChange={updatePreviewImage}
            className='edit-listing-input'
            required
          />
        </div>
        <div className='field-container'>
          <label className='field-edit-label' htmlFor='description'>Description</label>
          <textarea
            name='description'
            type='text'
            placeholder='Description'
            value={description}
            onChange={updateDescription}
            className='description-edit-input'
            required
          />
        </div>
        <button className='submit-edit-btn' type='submit'>Submit Changes</button>
      </form>
    </div>
)};

export default CreateListingForm;
