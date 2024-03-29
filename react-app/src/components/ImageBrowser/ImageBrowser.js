import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import * as imageActions from '../../store/images';
import './ImageBrowser.css';
import trashCan from '../../assets/trash_can.svg';

const ImageBrowser = ({ listing, user }) => {
  const dispatch = useDispatch();
  const listingImages = Object.values(useSelector(state => state.images));
  const [ownedByCurrUser, setOwnedByCurrUser] = useState(false)

  useEffect(() => {
    if ( user && user.id && listing.owner_id === user.id) {
      setOwnedByCurrUser(true);
    }
    dispatch(imageActions.resetImages());
    dispatch(imageActions.loadAllListingImages(listing.id));

  }, [dispatch, listing.owner_id, listing.id, user]);

  const handleDelete = async (e, imageId) => {
    e.preventDefault();
    dispatch(imageActions.deleteSingleImage(imageId)).then(() => dispatch(imageActions.loadAllListingImages(listing.id)));
  }

  return (
    <div className="img-browser-container">
    {
      ownedByCurrUser ? (<>
      <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
      { listingImages && listingImages.length > 0 &&
        (listingImages.map(image => (
          <div className="image-trash-layered">
            <button className="delete-img-btn" key={image.id+1} onClick={(e) => handleDelete(e, image.id)}>
              <img className="trash-icon" src={trashCan} alt="delete"/>
            </button>
            <img className="modal-listing-img" key={image.id} src={image.img_url} alt='listing'/>
          </div>))
        )
      }
    </>) : (
      <>
        <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
        { listingImages && listingImages.length > 0 &&
          (listingImages.map(image => (
            <>
            <img className="modal-listing-img" key={image.id} src={image.img_url} alt='listing'/>
            </>))
          )
        }
      </>
    )
    }
     </div>
  )
}

export default ImageBrowser;
