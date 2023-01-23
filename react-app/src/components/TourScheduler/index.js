import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditListingForm from './EditListingForm';


const TourSchedulerModal = ({ listing }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const closeModal= () => {
    setShowModal(false);
  }

  return (
    <>
      <button className="tour-sched-btn" onClick={openModal}>
        Request a tour
      </button>
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

export default TourSchedulerModal;
