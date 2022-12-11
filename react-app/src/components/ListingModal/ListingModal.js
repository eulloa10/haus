import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useLocation, useHistory } from 'react-router-dom';
import './ListingModal.css';
// import HeartLogo from '../../assets/Heart.svg';
import DeleteLogo from '../../assets/Hide.svg';
import EditLogo from '../../assets/edit.png';
import { Modal } from '../../context/Modal';
import EditListingModal from '../EditListingModal';
import * as listingActions from '../../store/listing';
import * as userTourActions from '../../store/userTours';
import * as tourActions from '../../store/tour';
import Scheduler from '../Scheduler';
import CreateListingModal from '../CreateListingModal';

const ListingModal = ({listing}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [isOwned, setIsOwned] = useState(false);
  const [userListingsOnly, setUserListingsOnly] = useState(false);
  const [hasTour, setHasTour] = useState(false);
  const user = useSelector(state => state.session.user);
  const userTours = useSelector(state => state.userTours);
  const [showModal, setShowModal] = useState(false);
  const [tourInfo, setTourInfo] = useState({});
  const [reschedule, setReschedule] = useState();
  const [tourChanged, setTourChanged] = useState();
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState("9am");
  const [refreshModal, setRefreshModal] = useState('false');
  const location = useLocation();
  const tour = [];

  let minCalOption = new Date();
  minCalOption.setDate(minCalOption.getDate() + 1);
  let maxCalOption = new Date();
  maxCalOption.setDate(maxCalOption.getDate() + 30);

  let minDate = minCalOption.getDate();
  let minMonth = minCalOption.getMonth() + 1;
  let minYear = minCalOption.getFullYear();
  let minDateString = `${minYear}-${minMonth}-${minDate}`

  useEffect(() => {
    if (user && (user.id === listing.owner_id)) {
      setIsOwned(true);
    }

    if (location.pathname.includes('/me/listings')) {
      setUserListingsOnly(true);
    }

    // Loop through all user's tours
    for (let key in userTours) {
      // Check if there is a tour for this listing in all user tours
      if (userTours[key].listing_id === listing.id) {
        setTourInfo({[key]: userTours[key]});
        setHasTour(true);
        break;
      }
    }

    // dispatch(userTourActions.loadAllTours());

  }, [listing, location, user, userTours]);

  useEffect(() => {
     dispatch(userTourActions.loadAllTours());
  }, [dispatch])


  console.log("USERTOURS", userTours);
  console.log("TOURINFO", tourInfo);
  console.log("RESCHEDULE", reschedule)
  console.log("HASTOUR", hasTour)

  const bookAppointmentHandler = async (e) => {
    e.preventDefault();

    const tourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(tourActions.addUsertour(listing.id, tourData)).then(() => dispatch(userTourActions.loadAllTours()));

    // setTourChanged(true)
    // setRefreshModal(true);

  }

  const rescheduleTourHandler = async (e) => {
    e.preventDefault();

    let updatedTourData = {
      tour_start_date: tourDate,
      tour_time_slot: tourTime
    };

    const res = await dispatch(userTourActions.editSingleUserTour(Object.values(tourInfo)[0].id, updatedTourData)).then(() => dispatch(userTourActions.loadAllTours())).then(() => setReschedule(false));

    // history.goBack();
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(listingActions.deleteUserListing(listing.id));

    history.push('/me/listings')

  }

  const cancelTourHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(userTourActions.deleteUserTour(Object.values(tourInfo)[0].id)).then(() => dispatch(userTourActions.loadAllTours())).then(() => setHasTour(false)).then(() => setTourInfo({}));

    // () => setTourInfo(previousTourInfo => {
    //   const newTourInfo = {...previousTourInfo};
    //   delete newTourInfo[tourInfo.id]
    //   return newTourInfo;
    // })

    // if (res) {
    //   history.push(`/listings`);
    // }
  }

  const rescheduleButtonHandler = (e) => {
    e.preventDefault();
    setReschedule(true);
  }

  const closeModal = () => {
    setShowModal(false);
    // history.push(`${match.url}/${listing.id}`);
  }

  const scheduleForm =
  <form className="schedule-form">
  <div>
    <h4>Select a date</h4>
    <input
      name="tourDate"
      type="date"
      value={tourDate}
      onChange={(e) => setTourDate(e.target.value)}
      min={minDateString}
      required
    />
  </div>
  {tourDate && (<>
    <h4>Select a time</h4>
    <span>
      <select id="time" name="time" required onChange={(e) => setTourTime(e.target.value)} defaultValue="9am">
        <option>9am</option>
        <option>10am</option>
        <option>11am</option>
        <option>12pm</option>
        <option>1pm</option>
        <option>2pm</option>
        <option>3pm</option>
        <option>4pm</option>
        <option>5pm</option>
        <option>6pm</option>
      </select>
    </span>
  </>
  )}
  { tourDate && tourTime &&
      (<button type="submit" onClick={hasTour && reschedule ? rescheduleTourHandler : bookAppointmentHandler}>Schedule</button>)
  }
</form>


  return (
    <div className="listing-modal">
      <div className="modal-listing-img-container">
        <img className="modal-listing-img" src={listing.preview_image} alt='home'/>
      </div>
      <div className="listing-info-container">
        <div className="listing-options">
          {
            isOwned && (
              <>
              <div className="edit-listing listing-option-btn">
                <EditListingModal listing={listing}/>
              </div>
              <button className="delete-listing listing-option-btn" onClick={deleteHandler}>
                <img className="listing-options-img" src={DeleteLogo} alt="delete"/>
                Delete
              </button>
              </>
            )
        }
        </div>
        <div className="listing-specs">
          <span className="listing-modal-price">
            ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="modal-spec">
            {listing.beds}
          </span>
          <span>
            bd
          </span>
          <span className="modal-divider">
            |
          </span>
          <span className="modal-spec">
            {listing.baths}
          </span>
          <span>
            ba
          </span>
          <span className="modal-divider">
            |
          </span>
          <span className="modal-spec">
            {listing.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span>
            sqft
          </span>
        </div>
          <ul className="modal-address-list">
            <li className="modal-address">
              {listing.address},
            </li>
            <li className="modal-address">
              {listing.city},
            </li>
            <li className="modal-address">
              {listing.state}
            </li>
            <li>
              {listing.zip_code}
            </li>
          </ul>
          <h3 className="modal-address-description-header">Overview</h3>
          <div className="modal-address-description">
            {listing.description}
          </div>
          { !isOwned && user &&
            (<>
            {!hasTour && (
            <>
             <h3 className="schedule-form">Schedule a tour</h3>
             {scheduleForm}
            </>
            )}
            {hasTour && !reschedule && (
              <>
              <h3 className="modal-address-description-header">Tour Scheduled</h3>
              <ul className="tour-summary">
                <li className="scheduled-tour-detail">
                  { Object.values(tourInfo).length > 0 &&
                  <>
                    <span>{Object.values(tourInfo)[0].tour_start_date}</span>
                    <span>@</span>
                    <span> {Object.values(tourInfo)[0].tour_time_slot}</span>
                  </>
                  }
                </li>
              </ul>
              <div className="schedule-options modal-address-description-header">
                <button onClick={rescheduleButtonHandler}>Reschedule</button>
                <button onClick={cancelTourHandler}>Cancel tour</button>
              </div>
              </>
            )}
            {hasTour && reschedule && (
              <>
                <h3 className="schedule-form">Reschedule your tour:</h3>
                {scheduleForm}
              </>
            )}
            </>)
          }
        </div>
        {showModal && (
        <Modal onClose={closeModal}>
          <EditListingModal onClose={closeModal} listing={listing}/>
        </Modal>
      )}
    </div>
  );
};

export default ListingModal;
