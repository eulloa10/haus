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
        <Route path='/login' exact={true}>
          <LoginFormModal />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpFormModal />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/me/listings' exact={true} >
          <Listing />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          <SplashBody />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
