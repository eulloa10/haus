
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../../auth/LogoutButton';
import './SplashBody.css';
import ZillowHome from '../../../assets/zillow-front-2.jpeg'

const SplashBody = () => {
  const user = useSelector(state => state.session.user);

  // const [ showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="splash-body">
      <div className="search-container">
        <img className="splash-home-front" src={ZillowHome} alt="house"/>
      </div>
      <div className="splash-cards">
        <div className="buy-home-card">
          <h4 className="card-header">Buy a home</h4>
          <p className="home-card-desc">Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p>
          <button className="browse-homes-card-btn">Browse homes</button>
        </div>
        <div className="schedule-tour-card">
          <h4 className="card-header">Make an offer</h4>
          <p className="offer-card-desc">Snag the home of your dreams before it's gone. Making an offer only takes a few minutes.</p>
          <button className="offer-card-btn">Make an offer</button>
        </div>
        <div className="place-offer-card">
          <h4 className="card-header">Tour a home</h4>
          <p className="tour-card-desc">See a home you like? Schedule a tour now with one of our agents. </p>
          <button className="tour-card-btn">Schedule a tour</button>
        </div>
      </div>
    </div>
  );
}

export default SplashBody;
