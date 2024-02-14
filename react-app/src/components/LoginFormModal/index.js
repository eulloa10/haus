import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { Link, NavLink }  from 'react-router-dom';
import SellHome from '../../assets/haus_sell_home.png';
import TourHome from '../../assets/haus_tour_home.png';
import LandingCard from '../LandingCard/LandingCard';

  function LoginFormModal({sellNavRedirect, sellCardRedirect, tourCardRedirect,}) {
  const [showModal, setShowModal] = useState(false);

  const sellHomeNavOption =
  (<NavLink to='/me/listings' activeClassName='active' onClick={() => setShowModal(true)} className="nav-bar-link">
    Sell
  </NavLink>)

  const sellHomeCardOption =
    (
    // <LandingCard
    //   onClick={() => setShowModal(true)}
    //   to="/me/listings"
    //   header="Sell a home"
    //   description="Ready to sell? Take advantage of our network and expertise."
    //   image={SellHome}
    //   buttonText="Sell a home"
    //   />


  <div className="option-card-container" onClick={() => setShowModal(true)}>
      <img className="splash-card-img" src={SellHome} alt="sell"/>
      <h4 className="card-header">Sell a home</h4>
      <p className="sell-card-desc">Ready to sell? Take advantage of our network and expertise.</p>
      <button className="sell-card-btn">Sell a home</button>
  </div>
  )

  const tourHomeCardOption =
  (<div className="option-card-container" onClick={() => setShowModal(true)}>
      <img className="splash-card-img" src={TourHome} alt="tour"/>
      <h4 className="card-header">Tour a home</h4>
      <p className="tour-card-desc">See a home you like? Schedule a tour now with one of our agents. </p>
      <button className="tour-card-btn">Find a home to tour</button>
  </div>)


  return (
    <>
      { sellNavRedirect ? (
         <>
         {sellHomeNavOption}
         </>
      ) : ( sellCardRedirect ? (
        <>
        {sellHomeCardOption}
        </>
      ) : (
        tourCardRedirect ?  (
          <>
          {tourHomeCardOption}
          </>
        ) : (
          (<Link onClick={() => setShowModal(true)} className="nav-bar-link">Sign In</Link>)
        )
      )
      )}
      {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <LoginForm />
      </Modal>
    )}
    </>
  );
}

export default LoginFormModal;
