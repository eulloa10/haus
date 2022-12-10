import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormModal from './components/LoginFormModal';
import NavBar from './components/SplashPage/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashBody from './components/SplashPage/SplashBody/SplashBody';
import ListingBrowser from './components/ListingBrowser';
import UserListingOptions from './components/UserListingOptions/UserListingOptions';
import TourBrowser from './components/TourBrowser';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <SplashBody />
        </Route>
        <Route path='/login' exact={true}>
          <LoginFormModal showModal={true}/>
        </Route>
        {/* <Route path='/sign-up' exact={true}>
          <SignUpFormModal />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/listings' exact={true}>
          <ListingBrowser />
        </Route>
        <Route path='/listings/:listingId' exact={true}>
          <ListingBrowser />
        </Route>
        <Route path='/listings/:listingId/edit' exact={true}>
          <ListingBrowser />
        </Route>
        <ProtectedRoute path='/me/listings' exact={true} >
          <ListingBrowser />
        </ProtectedRoute>
        <ProtectedRoute path='/me/listings/:listingId' exact={true} >
          <ListingBrowser />
        </ProtectedRoute>
        <ProtectedRoute path='/me/listings/:listingId/edit' exact={true} >
          <ListingBrowser />
        </ProtectedRoute>
        <ProtectedRoute path='/me/listings/create' exact={true}>
          <ListingBrowser />
        </ProtectedRoute>
        <ProtectedRoute path='/me/tours' exact={true}>
          <ListingBrowser />
        </ProtectedRoute>
        <ProtectedRoute path='/me/tours/listings/:listingId' exact={true}>
          <ListingBrowser />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
