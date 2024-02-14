import React from 'react';
import ZillowHome from '../../assets/zillow-front-2.jpeg';
import './LandingImage.css';

const LandingImage = () => {
  return (
    <div className="splash-img-container">
      <img className="splash-home-front-img" src={ZillowHome} alt="house"/>
    </div>
  )
}

export default LandingImage;
