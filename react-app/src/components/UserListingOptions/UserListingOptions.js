import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink, useRouteMatch } from 'react-router-dom';
import './UserListingOptions.css';
import { Modal } from '../../context/Modal';
import ListingModal from '../ListingModal/ListingModal';

const UserListingOptions = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  // const openModal = () => {
  //   setShowModal(true);
  // }

  // const closeModal = () => {
  //   setShowModal(false);
  //   history.push(match.url);
  // }

  return (
    <div>These are my options</div>
  )
};

export default UserListingOptions;
