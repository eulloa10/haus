import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import listingReducer from './listing';
import userListingReducer from './userListing';
import tourReducer from './tour';
import tourListingReducer from './tour_listing';
import userTourReducer from './userTours';
import favoritesReducer from './favorites';
import imageReducer from './images';

const rootReducer = combineReducers({
  session,
  listings: listingReducer,
  userListings: userListingReducer,
  tours: tourReducer,
  userTours: userTourReducer,
  tourListings: tourListingReducer,
  favorites: favoritesReducer,
  images: imageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
