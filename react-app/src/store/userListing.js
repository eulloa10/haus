// constants
const GET_USER_LISTINGS = 'userListing/GET_USER_LISTINGS';
const RESET_USER_LISTINGS = 'userListing/RESET_USER_LISTINGS';

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

export const resetUserListings = () => ({
  type: RESET_USER_LISTINGS
})

const initialState = {};

const userListingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_LISTINGS:
      action.userListings.forEach((listing) => {
        newState[listing.id] = listing;
      });
      return newState;
    case RESET_USER_LISTINGS:
      return initialState
    default:
      return state;
  }
}

export default userListingReducer;
