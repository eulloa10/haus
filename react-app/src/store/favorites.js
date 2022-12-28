// constants
const GET_ALL_USER_FAVORITES = 'favorites/GET_ALL_USER_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';
const RESET_FAVORITES = 'favorites/RESET_FAVORITES';

const getAllUserFavorites = (favorites) => ({
  type: GET_ALL_USER_FAVORITES,
  favorites
})

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite
})

const deleteFavorite = (favoriteId) => ({
  type: DELETE_FAVORITE,
  favoriteId
})

export const resetUserFavorites = () => ({
  type: RESET_FAVORITES
})


export const loadAllUserFavorites = () => async (dispatch) => {
  const res = await fetch('/api/me/favorites');

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllUserFavorites(data.user_favorite_listings))
  } else {
    throw res;
  }
}

export const addUserFavorite = (listingId, favoriteData) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}/favorites`, {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(favoriteData)
  })

  if (res.ok) {
		const favorite = await res.json();
		dispatch(addFavorite(favorite));
	}
  return res;
}


export const deleteUserFavorite = (favoriteId) => async (dispatch) => {
  const res = await fetch(`/api/me/favorites/${favoriteId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
		dispatch(deleteFavorite(favoriteId));
	}

  return res;
}

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_ALL_USER_FAVORITES:
      action.favorites.forEach((favorite) => {
        newState[favorite.id] = favorite;
      });
      return newState;
    case ADD_FAVORITE:
      newState[action.favorite.id] = action.favorite;
      return newState;
    case DELETE_FAVORITE:
      delete newState[action.favoriteId];
      return newState;
    case RESET_FAVORITES:
      return initialState
    default:
      return state;
  }
}

export default favoritesReducer;
