import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import './UploadPicture.css';


const UploadPicture = ({listingId}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/listings/${listingId}/images`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    // const clearImage = (e) => {
    //     setImage(null);
    // }

    return (
        <>
        <h2>Add new listing images</h2>
        <form className="add-listing-img-form" onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              className='choose-file-input'
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
        </>
    )
}

export default UploadPicture;
