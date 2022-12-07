const GET_USER_TOURS = 'userTours/GET_USER_TOURS';

const getUserTours = (tours) => ({
  type: GET_USER_TOURS,
  tours
})

const initialState = {};


export const loadAllTours = () => async (dispatch) => {
  const res = await fetch('/api/me/tours');

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserTours(data.user_tours))
  } else {
    throw res;
  }
}

const userTourReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_TOURS:
      action.tours.forEach((tour) => {
        newState[tour.id] = tour;
      });
      return newState;
    default:
      return state;
  }
}

export default userTourReducer;
