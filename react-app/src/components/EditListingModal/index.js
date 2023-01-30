import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditListingForm from './EditListingForm';
import { Link }  from 'react-router-dom';
import EditLogo from '../../assets/edit.png';
// import './CreateListingModal.css';

function EditListingModal({listing}) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }


  const closeModal= () => {
    setShowModal(false);
    // history.push('/me/listings')
  }


  return (
    <>
      <NavLink to={`/me/listings/${listing.id}/edit`} onClick={openModal} className="edit-btn">
                  <img className="edit-option-img" src={EditLogo} alt="edit"/>
      </NavLink>
      {showModal && (
        <>
          <Modal onClose={closeModal}>
            <EditListingForm listing={listing} onClose={closeModal}  />
          </Modal>
        </>
      )}
    </>
  );
}

export default EditListingModal;
