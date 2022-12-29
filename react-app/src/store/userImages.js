const GET_USER_IMAGES = 'userImages/GET_USER_IMAGE';
const DELETE_USER_IMAGE= 'userImages/DELETE_USER_IMAGE';
const ADD_USER_IMAGE = 'userImages/ADD_USER_IMAGE';
const RESET_USER_IMAGES = 'userImages/RESET_USER_IMAGES';

const getUserImages = (images) => ({
  type: GET_USER_IMAGES,
  images
})

const addUserImage = (image) => ({
  type: ADD_USER_IMAGE,
  image
})

const deleteUserImage = (imageId) => ({
  type: DELETE_USER_IMAGE,
  imageId
})

export const resetUserImages = () => ({
  type: RESET_USER_IMAGES
})

export const loadAllUserImages = () => async (dispatch) => {
  const res = await fetch('/api/me/images');
  if (res.ok) {
    const data = await res.json();
    dispatch(getUserImages(data.user_images))
  } else {
    throw res;
  }
}



export const deleteSingleUserImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteUserImage(imageId));
	}

  return res;
}

const initialState = {};

const userImageReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_IMAGES:
      action.images.forEach((image) => {
        newState[image.id] = image;
      });
      return newState;
    case DELETE_USER_IMAGE:
      delete newState[action.imageId];
      return newState;
    case RESET_USER_IMAGES:
      return initialState
    default:
      return state;
  }
}

export default userImageReducer;
