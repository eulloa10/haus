const GET_IMAGES = 'images/GET_IMAGE';
const DELETE_IMAGE= 'images/DELETE_IMAGE';
const ADD_IMAGE = 'images/ADD_IMAGE';
const RESET_IMAGES = 'images/RESET_IMAGES';

const getImages = (images) => ({
  type: GET_IMAGES,
  images
})

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
})

const deleteImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId
})

export const resetImages = () => ({
  type: RESET_IMAGES
})

export const loadAllListingImages = (listingId) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}/images`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getImages(data.images))
  } else {
    throw res;
  }
}

export const addListingImage = (listingId, image) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}/images`, {
    method: 'POST',
    body: image
  });

  if (res.ok) {
    const newImage = await res.json();
    dispatch(addImage(newImage))
  } else {
    throw res;
  }
}


export const deleteSingleImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteImage(imageId));
	}

  return res;
}

const initialState = {};

const userImageReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_IMAGES:
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    case DELETE_IMAGE:
      delete newState[action.imageId];
      return newState;
    case RESET_IMAGES:
      return initialState
    default:
      return state;
  }
}

export default userImageReducer;
