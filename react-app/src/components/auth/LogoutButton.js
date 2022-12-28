import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../store/session';
import { resetUserTours } from '../../store/userTours';
import { resetUserListings } from '../../store/userListing';
import { resetUserFavorites } from '../../store/favorites';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetUserTours());
    await dispatch(resetUserListings());
    await dispatch(resetUserFavorites());
  };

  return <Link onClick={onLogout}>Sign out</Link>;
};

export default LogoutButton;
