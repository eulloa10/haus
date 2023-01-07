import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import addImage from'../../assets/add_image.png';
import UploadPicture from '../UploadPicture';
import * as imageActions from '../../store/images';
import './ImageBrowser.css'

const ImageBrowser = ({ listing, user }) => {
  const dispatch = useDispatch();
  // const listingImages = listing.images;
  const listingImages = Object.values(useSelector(state => state.images));
  const [ownedByCurrUser, setOwnedByCurrUser] = useState(false)

  useEffect(() => {
    if ( user && user.id && listing.owner_id === user.id) {
      setOwnedByCurrUser(true);
    }
    dispatch(imageActions.resetImages());
    dispatch(imageActions.loadAllListingImages(listing.id));

  }, [dispatch, listing.owner_id, listing.id, user]);

  // console.log("LISTING", listing);
  // console.log("LISTINGIMAGES", listingImages)

  // console.log("LISTINGIMAGES2", listing.preview_image)

  const handleDelete = async (e, imageId) => {
    e.preventDefault();
    dispatch(imageActions.deleteSingleImage(imageId)).then(() => dispatch(imageActions.loadAllListingImages(listing.id)));
  }

  return (
    <>
    {
      ownedByCurrUser ? (<div>
      <UploadPicture listingId={listing.id}/>
      <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
      { listingImages && listingImages.length > 0 &&
        (listingImages.map(image => (
          <>
          <button key={image.id+1} onClick={(e) => handleDelete(e, image.id)}>DELETE</button>
          <img className="modal-listing-img" key={image.id} src={image.img_url} alt='listing'/>
          </>))
        )
      }
    </div>) : (
      <div>
        <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
        { listingImages && listingImages.length > 0 &&
          (listingImages.map(image => (
            <>
            <img className="modal-listing-img" key={image.id} src={image.img_url} alt='listing'/>
            </>))
          )
        }
      </div>
    )
    }
     </>
  )
}

export default ImageBrowser;
