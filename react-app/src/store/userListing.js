// constants
const GET_USER_LISTINGS = 'user_listing/GET_USER_LISTINGS';

const getUserListings = (userListings) => ({
  type: GET_USER_LISTINGS,
  userListings
});

export const getUserOwnedListings = () => async (dispatch) => {
  const res = await fetch('/api/me/listings');

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserListings(data.user_listings))
  } else {
    throw res;
  }
}

const initialState = {};

const userListingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_LISTINGS:
      action.userListings.forEach((listing) => {
        newState[listing.id] = listing;
      });
      return newState;
    default:
      return state;
  }
}

export default userListingReducer;
