// constants
const GET_USER_LISTINGS = 'listing/GET_USER_LISTINGS';
const GET_LISTING = 'listing/GET_LISTING';
const ADD_LISTING = 'listing/ADD_LISTING';
const DELETE_LISTING = 'listing/DELETE_LISTING'
const EDIT_LISTING = 'listing/EDIT_LISTING'

const getUserListings = (user_listings) => ({
  type: GET_USER_LISTINGS,
  user_listings
});

const getListing = (listing) => ({
  type: GET_LISTING,
  listing
})

const addListing = (listing) => ({
  type: ADD_LISTING,
  listing
})

const deleteListing = (listingId) => ({
  type: DELETE_LISTING,
  listingId
})

const editListing = (listing) => ({
  type: EDIT_LISTING,
  listing
})

const initialState = {
  userListings: null,
  listings: null
};



export const getUserOwnedListings = () => async (dispatch) => {
  const res = await fetch('/api/me/listings');

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserListings(data.user_listings))
  } else {
    throw res;
  }
}

const listingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_LISTINGS:
      action.user_listings.forEach((listing) => {
        newState.userListings = listing;
      });
      return newState;
    default:
      return state;
  }
}

export default listingReducer;
