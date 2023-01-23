import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TourSchedulerForm from './TourSchedulerForm';

// const formatTourDate = (dateString) => {
//   dateString.split(" ");

// }


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
      {
        hasTour ? (<button className="tour-sched-btn" onClick={openModal}>
        <span>Manage Tour:</span>
        <span className="tour-btn-details">
        {currentTourInfo.tour_start_date.split(" ").slice(0,4).join(" ")} @ {currentTourInfo.tour_time_slot}
        </span>
      </button>) : (<button className="tour-sched-btn" onClick={openModal}>
          Request a Tour
        </button>)
      }

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
