import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import addImage from'../../assets/add_image.png';
import UploadPicture from '../UploadPicture';
import './ImageBrowser.css'

const ImageBrowser = ({ listing, user }) => {
  const dispatch = useDispatch();
  const listingImages = listing.images;
  const [ownedByCurrUser, setOwnedByCurrUser] = useState(false)

  useEffect(() => {
    if (listing.owner_id === user.id) {
      setOwnedByCurrUser(true);
    }
  }, [listing.owner_id, user.id]);

  console.log("LISTINGIMAGES", listingImages)
  console.log("LISTINGIMAGES2", listing.preview_image)

  return (
    <>
    {
      ownedByCurrUser ? (<div>
      <UploadPicture listingId={listing.id}/>
      <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
      { listingImages.length > 0 &&
        (listingImages.map(image => (
          <>
          <button key={image.id+1}>DELETE</button>
          <img className="modal-listing-img" key={image.id} src={image.img_url} alt='listing'/>
          </>))
        )
      }
    </div>) : (
      <div>
        <img className="modal-listing-img" src={listing.preview_image} alt="preview"/>
        { listingImages.length > 0 &&
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
