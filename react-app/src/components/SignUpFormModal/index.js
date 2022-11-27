import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import { Link }  from 'react-router-dom';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Link onClick={() => setShowModal(true)}>Sign Up</Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
