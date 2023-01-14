// constants
const GET_ALL_LISTINGS = 'listing/GET_ALL_LISTINGS';
const GET_LISTING = 'listing/GET_LISTING';
const ADD_LISTING = 'listing/ADD_LISTING';
const DELETE_LISTING = 'listing/DELETE_LISTING'
const EDIT_LISTING = 'listing/EDIT_LISTING'

const getAllListings = (listings) => ({
  type: GET_ALL_LISTINGS,
  listings
})

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

const initialState = {};


export const loadAllListings = () => async (dispatch) => {
  const res = await fetch('/api/listings');

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllListings(data.listings))
  } else {
    throw res;
  }
}

export const loadSingleListing = (listingId) => async (dispatch) =>  {
  const res = await fetch(`/api/listings/${listingId}`)

  if (res.ok) {
    const data = await res.json();
    dispatch(getListing(data.user_listing))
  } else {
    throw res;
  }
}

export const addUserListing = (listingData) => async (dispatch) => {
  const res = await fetch('/api/listings/', {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(listingData)
  })

  if (res.ok) {
		const listing = await res.json();
		dispatch(addListing(listing));
	}
  return res;
}

export const editUserListing = (listingId, listingData) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(listingData)
  })

  if (res.ok) {
		const updatedListing = await res.json();
		dispatch(editListing(updatedListing));
	}
  return res;
}

export const deleteUserListing = (listingId) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteListing(listingId));
	}

  return res;
}

const listingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_ALL_LISTINGS:
      action.listings.forEach((listing) => {
        newState[listing.id] = listing;
      });
      return newState;
    // case GET_LISTING:
    //   newState[action.listing.id] = action.listing;
    //   return newState;
    case ADD_LISTING:
      newState[action.listing.id] = action.listing;
      return newState;
    case EDIT_LISTING:
      newState[action.listing.id] = action.listing;
      return newState;
    case DELETE_LISTING:
      delete newState[action.listingId];
      return newState;
    default:
      return state;
  }
}

export default listingReducer;
