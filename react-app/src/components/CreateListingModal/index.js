// import CreateListingModal from "./CreateListingModal"

// export default CreateListingModal;
import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateListingForm from './CreateListingForm';
import { Link }  from 'react-router-dom';
import './CreateListingModal.css';

function CreateListingModal() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [firstRenderDone, setFirstRenderDone] = useState(true);
  const listings = useSelector(state => state.listings);

  // useEffect(() => {
  //   closeModal();

  // }, [listings]);

  useEffect(() => {
    return () => {
      setShowModal(false)
    };
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }


  const closeModal= () => {
    setShowModal(false);
    history.push('/me/listings')
  }


  return (
    <>
      <Link to="/me/listings/create" className="add-listing" onClick={openModal}>
        Add new listing
      </Link>
      {showModal && (
        <>
          <Modal onClose={closeModal}>
            <CreateListingForm onClose={closeModal}  />
          </Modal>
        </>
      )}
    </>
  );
}

export default CreateListingModal;
