const GET_TOUR_LISTING_DATA = 'tour_listing/GET_TOUR_LISTING_DATA';

const getTourListingData = (tour) => ({
  type: GET_TOUR_LISTING_DATA,
  tour
})

export const getTourListings = () => async (dispatch) => {
  const res = await fetch('/api/me/tours/data');

  if (res.ok) {
    const data = await res.json();
    dispatch(getTourListingData(data.user_tours_listing_data))
  } else {
    throw res;
  }
}

const initialState = {};

const tourListingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_TOUR_LISTING_DATA:
      action.tours.forEach((tour) => {
        newState[tour.id] = tour;
      });
      return newState;
    default:
      return state;
  }
}

export default tourListingReducer;
