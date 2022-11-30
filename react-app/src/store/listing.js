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
    console.log("______DATA_____", data)
    dispatch(getAllListings(data.listings))
  } else {
    throw res;
  }
}

const listingReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_ALL_LISTINGS:
      action.listings.forEach((listing) => {
        newState[listing.id] = listing;
      });
      return newState;
    default:
      return state;
  }
}

export default listingReducer;
