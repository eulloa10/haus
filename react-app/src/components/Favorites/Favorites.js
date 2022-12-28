import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import emptyHeart from '../../assets/empty_heart.svg';
import fullHeart from '../../assets/full_heart.svg';
import * as favoriteActions from '../../store/favorites';

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

    const res = await dispatch(favoriteActions.addUserFavorite(listing.id, favoriteData)).then(() => setLiked(true)).then(() => dispatch(favoriteActions.loadAllUserFavorites()));
  }

  const unsaveListingHandler = async (e) => {
    e.preventDefault();

    const res = await dispatch(favoriteActions.deleteUserFavorite(currentFavoriteInfo.id)).then(() => setLiked(false)).then(() => dispatch(favoriteActions.loadAllUserFavorites()));
  }


  return (
    <>
    {
      liked ? (
        <button className="fav-listing-btn" onClick={unsaveListingHandler}>
          <img className="fav-img" src={fullHeart} alt="unsave option"/>
          <span>Saved</span>
        </button>) : (
          <button className="fav-listing-btn" onClick={saveListingHandler}>
            <img className="fav-img" src={emptyHeart} alt="save option"/>
            <span>Save</span>
          </button>)
    }
    </>
  )
}

export default Favorites;
