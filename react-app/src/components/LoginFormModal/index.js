import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { Link, NavLink }  from 'react-router-dom';

  function LoginFormModal({sellNavRedirect, sellCardRedirect, tourCardRedirect, }) {
  const [showModal, setShowModal] = useState(false);

  const sellHomeNavOption =
  (<NavLink to='/me/listings' activeClassName='active' onClick={() => setShowModal(true)} className="nav-bar-link">
    Sell
  </NavLink>)

  const sellHomeCardOption =
  (<div onClick={() => setShowModal(true)}>
    <div className="place-sell-card">
      <h4 className="card-header">Sell a home</h4>
      <p className="sell-card-desc">Ready to sell? Take advantage of our network and expertise.</p>
      <button className="sell-card-btn">Sell a home</button>
    </div>
  </div>)

  const tourHomeCardOption =
  (<div onClick={() => setShowModal(true)}>
    <div className="schedule-tour-card">
      <h4 className="card-header">Tour a home</h4>
      <p className="tour-card-desc">See a home you like? Schedule a tour now with one of our agents. </p>
      <button className="tour-card-btn">Find a home to tour</button>
    </div>
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
