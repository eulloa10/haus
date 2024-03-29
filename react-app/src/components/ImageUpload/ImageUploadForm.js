import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as userListingActions from '../../store/userListing';
import * as imageActions from '../../store/images';


const ImageUploadForm = ({listingId, onClose}) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [tempImgUrl, setTempImgUrl] = useState('');
    const [showImgPreview, setShowImgPreview] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [selectImgButton, setSelectImgButton] = useState("+ Select image")

    useEffect(() => {
        dispatch(userListingActions.getUserOwnedListings());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        setImageLoading(true);

        // TODO: Add error handling for incorrect image types or unsuccesful upload attempts

        dispatch(imageActions.addListingImage(listingId, formData)).then(URL.revokeObjectURL(tempImgUrl)).then(() => {onClose()});

        e.target[0].value = ''
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setTempImgUrl(URL.createObjectURL(e.target.files[0]))
        setShowImgPreview(true);
        setSelectImgButton("+ Change image")
        setShowSubmit(true);
    }

    return (
        <div className="add-img-container">
            <h2 className="add-img-header">Add listing images</h2>
            <label className="upload-listing-img-btn" htmlFor="add-listing-img-btn">{selectImgButton}</label>
            <div className="preview-container">
                {
                    tempImgUrl ? (<img className="listing-img-preview" src={tempImgUrl} alt='preview'/>) : (<span className="img-preview-announcement">Select an image to display preview</span>)
                }
            </div>
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
        </div>
    )
}

export default ImageUploadForm;
