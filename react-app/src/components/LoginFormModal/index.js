import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { Link }  from 'react-router-dom';

  function LoginFormModal({sellRedirect}) {
  const [showModal, setShowModal] = useState(false);
  console.log("SELLREDIRECT", sellRedirect)

  return (
    <>
      { sellRedirect ? (
        <>
         <Link to='/me/listings' exact={true} activeClassName='active' onClick={() => setShowModal(true)}>
              Sell
        </Link>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
        )}
        </>
      ) : (
        <>
        <Link onClick={() => setShowModal(true)}>Sign In</Link>
        {showModal && (
        <>
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
        </>
      )}
      </>
      )}
    </>
  );
}

export default LoginFormModal;
