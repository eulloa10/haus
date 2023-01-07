import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as userListingActions from '../../store/userListing';
import * as imageActions from '../../store/images';
import './UploadPicture.css';


const UploadPicture = ({listingId}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();
    const userListings = useSelector(state => state.session.userListings);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        dispatch(userListingActions.getUserOwnedListings());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // setImageLoading(true);

        // const res = await fetch(`/api/listings/${listingId}/images`, {
        //     method: "POST",
        //     body: formData,
        // });
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     // history.push("/images");
        // }
        // else {
        //     setImageLoading(false);
        //     // a real app would probably use more advanced
        //     // error handling
        //     console.log("error");
        // }
        setImageLoading(true);
        dispatch(imageActions.addListingImage(listingId, formData)).then(() => setImageLoading(false)).then(() => dispatch(imageActions.loadAllListingImages(listingId)));

        // dispatch(userListingActions.getUserOwnedListings());
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    // const clearImage = (e) => {
    //     setImage(null);
    // }

    return (
        <div className="add-img-container">
            <h3 className="add-listing-img-header">Add listing image</h3>
            <form className="add-listing-img-form" onSubmit={handleSubmit}>
                <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                className='choose-file-input'
                />
                {(imageLoading) ? (<p className="submit-listing-img-btn">Loading...</p>) : (<button className="submit-listing-img-btn" type="submit">Submit</button>)}
            </form>
        </div>
    )
}

export default UploadPicture;
