import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TourSchedulerForm from './TourSchedulerForm';


const TourSchedulerModal = ({ listing, userTours, isOwned, user, hasTour, currentTourInfo, setHasTour }) => {
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
            <div className="tour-scheduler-modal">
              <TourSchedulerForm listing={listing} userTours={userTours} isOwned={isOwned} user={user} onClose={closeModal} hasTour={hasTour} currentTourInfo={currentTourInfo} setHasTour={setHasTour}/>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default TourSchedulerModal;
