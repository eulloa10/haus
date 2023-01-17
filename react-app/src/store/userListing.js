// constants
const GET_USER_LISTINGS = 'userListing/GET_USER_LISTINGS';
const REMOVE_USER_LISTING = 'userListing/REMOVE_USER_LISTING';
const RESET_USER_LISTINGS = 'userListing/RESET_USER_LISTINGS';
const EDIT_USER_LISTING = 'userListing/EDIT_USER_LISTING';

export const getUserListings = (userListings) => ({
  type: GET_USER_LISTINGS,
  userListings
});

export const editUserListing = (listing) => ({
  type: EDIT_USER_LISTING,
  listing
})

export const removeUserListing = (listingId) => ({
  type: REMOVE_USER_LISTING,
  listingId
})

export const getUserOwnedListings = () => async (dispatch) => {
  const res = await fetch('/api/me/listings');

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserListings(data.user_listings))
  } else {
    throw res;
  }
}

export const editSingleUserListing = (listingId, listingData) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(listingData)
  })

  if (res.ok) {
		const updatedListing = await res.json();
		dispatch(editUserListing(updatedListing));
	}
  return res;
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
    case REMOVE_USER_LISTING:
      delete newState[action.listingId]
      return newState;
    case EDIT_USER_LISTING:
      newState[action.listing.id] = action.listing;
      return newState;
    case RESET_USER_LISTINGS:
      return initialState
    default:
      return state;
  }
}

export default userListingReducer;
