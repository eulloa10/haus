import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { Link }  from 'react-router-dom';

  function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Link onClick={() => setShowModal(true)}>Sign In</Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
