import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import newImg from '../../assets/new_image_btn.png';
import ImageUploadForm from './ImageUploadForm';
import './ImageUpload.css';


const ImageUploadModal = ({ listingId, isOwned }) => {
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
        isOwned && (<button className="add-listing-img-btn" onClick={openModal}>
        <img className="new-img-icon" src={newImg} alt="add new" />
      </button>)
      }

      {showModal && (
          <Modal  onClose={closeModal}>
              <div className="img-upload-modal-container">
                <ImageUploadForm listingId={listingId} onClose={closeModal}/>
              </div>
          </Modal>
      )}
    </>
  );
}

export default ImageUploadModal;
