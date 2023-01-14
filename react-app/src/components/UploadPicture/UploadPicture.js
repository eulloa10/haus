import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as userListingActions from '../../store/userListing';
import * as imageActions from '../../store/images';
import './UploadPicture.css';


const UploadPicture = ({listingId}) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [tempImgUrl, setTempImgUrl] = useState('');
    const [showImgPreview, setShowImgPreview] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [selectImgButton, setSelectImgButton] = useState("+ Add image")

    useEffect(() => {
        dispatch(userListingActions.getUserOwnedListings());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        setImageLoading(true);

        dispatch(imageActions.addListingImage(listingId, formData)).then(() => setImageLoading(false)).then(() => dispatch(imageActions.loadAllListingImages(listingId))).then(() => setShowImgPreview(false)).then(URL.revokeObjectURL(tempImgUrl)).then(() => setShowSubmit(false)).then(() => setSelectImgButton("+ Add image"));

        e.target[0].value = ''
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
        setShowImgPreview(true);
        setSelectImgButton("+ Select new image")
        setShowSubmit(true);
    }

    // const clearImage = (e) => {
    //     setImage(null);
    // }

    return (
        <div className="add-img-container">
            <label className="upload-listing-img-btn" htmlFor="add-listing-img-btn">{selectImgButton}</label>
            <form className="add-listing-img-form" onSubmit={handleSubmit}>
                <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                className="choose-file-input"
                id="add-listing-img-btn"
                hidden
                />
                {imageLoading ? showImgPreview && (<p className="submit-listing-img-btn">Uploading...</p>) : showImgPreview && (<button className="submit-listing-img-btn" type="submit">Upload</button>)}
            </form>
            {showImgPreview && (
                <div className="preview-container">
                    <h4 className="preview-header">Preview</h4>
                    <img className="listing-img-preview" src={tempImgUrl} alt='preview'/>
                </div>
                )
            }
        </div>
    )
}

export default UploadPicture;
