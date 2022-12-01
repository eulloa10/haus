import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
import LoginFormModal from './components/LoginFormModal';
import SignUpFormModal from './components/SignUpFormModal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/SplashPage/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashBody from './components/SplashPage/SplashBody/SplashBody';
import Listing from './components/Listing';
import ListingBrowser from './components/ListingBrowser';
import CreateListingForm from './components/CreateListingForm/CreateListingForm';

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
          {/* <h1>My Home Page</h1> */}
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
        <Route path='/listings' exact={true} >
          <ListingBrowser />
        </Route>
        <ProtectedRoute path='/me/listings' exact={true} >
          <CreateListingForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
