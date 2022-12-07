const GET_ALL_TOURS = 'tour/GET_ALL_TOURS';
const GET_TOUR = 'tour/GET_TOUR';
const ADD_TOUR = 'tour/ADD_TOUR';
const DELETE_TOUR = 'tour/DELETE_TOUR';
const EDIT_TOUR = 'tour/EDIT_TOUR';


const getAlltours = (tours) => ({
  type: GET_ALL_TOURS,
  tours
})

const getTour = (tour) => ({
  type: GET_TOUR,
  tour
})

const addTour = (tour) => ({
  type: ADD_TOUR,
  tour
})

const deleteTour = (tourId) => ({
  type: DELETE_TOUR,
  tourId
})

const editTour = (tour) => ({
  type: EDIT_TOUR,
  tour
})

const initialState = {};


export const loadAllTours = () => async (dispatch) => {
  const res = await fetch('/api/tours');

  if (res.ok) {
    const data = await res.json();
    console.log("OGTOUR", data.tours)
    dispatch(getAlltours(data.tours))
  } else {
    throw res;
  }
}

export const addUsertour = (listingId, tourData) => async (dispatch) => {

  const res = await fetch(`/api/listings/${listingId}/tours/`, {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(tourData)
  })

  if (res.ok) {
		const tour = await res.json();
		dispatch(addTour(tour));
	}
  return res;
}

export const editUsertour = (tourId, tourData) => async (dispatch) => {
  const res = await fetch(`/api/tours/${tourId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(tourData)
  })

  if (res.ok) {
		const updatedtour = await res.json();
		dispatch(editTour(updatedtour));
	}
  return res;
}

export const deleteUsertour = (tourId) => async (dispatch) => {
  const res = await fetch(`/api/tours/${tourId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteTour(tourId));
	}

  return res;
}

const tourReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_ALL_TOURS:
      action.tours.forEach((tour) => {
        newState[tour.id] = tour;
      });
      return newState;
    case ADD_TOUR:
      newState[action.tour.id] = action.tour;
      return newState;
    case EDIT_TOUR:
      newState[action.tour.id] = action.tour;
      return newState;
    case DELETE_TOUR:
      delete newState[action.tourId];
      return newState;
    default:
      return state;
  }
}

export default tourReducer;
