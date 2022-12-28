import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import emptyHeart from '../../assets/empty_heart.svg';
import fullHeart from '../../assets/full_heart.svg';
import * as favoriteActions from '../../store/favorites';
import './Favorites.css';

const Favorites = ({ listing, user }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [currentFavoriteInfo, setCurrentFavoriteInfo] = useState(null);
  const userFavorites = Object.values(useSelector(state => state.favorites));

  useEffect(() => {
    dispatch(favoriteActions.loadAllUserFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (userFavorites) {
      for (let key in userFavorites) {
        if (userFavorites[key].listing_id === listing.id) {
          setLiked(true);
          setCurrentFavoriteInfo(userFavorites[key]);
          break;
        }
      }
    }
  }, [listing.id, userFavorites])

  const saveListingHandler = async (e) => {
    e.preventDefault();
    const favoriteData = {
      user_id: user.id,
      listing_id: listing.id
    };

    await dispatch(favoriteActions.addUserFavorite(listing.id, favoriteData)).then(() => setLiked(true)).then(() => dispatch(favoriteActions.loadAllUserFavorites()));
  }

  const unsaveListingHandler = async (e) => {
    e.preventDefault();

    await dispatch(favoriteActions.deleteUserFavorite(currentFavoriteInfo.id)).then(() => setLiked(false)).then(() => dispatch(favoriteActions.loadAllUserFavorites()));
  }


  return (
    <>
    {
      liked ? (
        <div className="fav-container">
          <button className="fav-listing-btn" onClick={unsaveListingHandler}>
            <img className="fav-img" src={fullHeart} alt="unsave option"/>
            <span className="fav-btn-text">Saved</span>
          </button>
          </div>) : (
          <div className="fav-container">
            <button className="fav-listing-btn" onClick={saveListingHandler}>
              <img className="fav-img" src={emptyHeart} alt="save option"/>
              <span className="fav-btn-text">Save</span>
            </button>
          </div>)
    }
    </>
  )
}

export default Favorites;
