import React from 'react';
import './LandingCard.css'

const LandingCard = ({ header, description, image, buttonText}) => {

  return (
      <div className="splash-card-contents">
        <img className="splash-card-img" src={image} alt="card-img" />
        <h2 className="splash-card-header">{header}</h2>
        <p className="splash-card-desc">{description}</p>
        <button className="splash-card-btn">{buttonText}</button>
      </div>
  )
}

export default LandingCard;
