const GET_USER_TOURS = 'userTours/GET_USER_TOUR';
const DELETE_USER_TOUR = 'userTours/DELETE_USER_TOUR';
const EDIT_USER_TOUR = 'userTours/EDIT_USER_TOUR';
const RESET_USER_TOURS = 'userTours/RESET_USER_TOURS';

const getUserTours = (tours) => ({
  type: GET_USER_TOURS,
  tours
})

const editUserTour = (tour) => ({
  type: EDIT_USER_TOUR,
  tour
})

const deleteUserTours = (tourId) => ({
  type: DELETE_USER_TOUR,
  tourId
})

export const resetUserTours = () => ({
  type: RESET_USER_TOURS
})

export const editSingleUserTour = (tourId, tourData) => async (dispatch) => {
  const res = await fetch(`/api/tours/${tourId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(tourData)
  })

  if (res.ok) {
		const updatedtour = await res.json();
		dispatch(editUserTour(updatedtour));
	}
  return res;
}

export const deleteUserTour = (tourId) => async (dispatch) => {
  const res = await fetch(`/api/tours/${tourId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteUserTours(tourId));
	}

  return res;
}

export const loadAllTours = () => async (dispatch) => {
  const res = await fetch('/api/me/tours');
  if (res.ok) {
    const data = await res.json();
    dispatch(getUserTours(data.user_tours))
  } else {
    throw res;
  }
}

const initialState = {};

const userTourReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_TOURS:
      action.tours.forEach((tour) => {
        newState[tour.id] = tour;
      });
      return newState;
    case EDIT_USER_TOUR:
      newState[action.tour.id] = action.tour;
      return newState;
    case DELETE_USER_TOUR:
      delete newState[action.tourId];
      return newState;
    case RESET_USER_TOURS:
      return initialState
    default:
      return state;
  }
}

export default userTourReducer;
