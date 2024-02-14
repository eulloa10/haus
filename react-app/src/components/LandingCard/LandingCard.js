import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingCard.css'
import LoginFormModal from '../LoginFormModal';

const LandingCard = ({ header, description, image, buttonText}) => {

  return (
      <div className="splash-card-contents">
        <img className="splash-card-img" src={image} alt="card-img" />
        <h4 className="splash-card-header">{header}</h4>
        <p className="splash-card-desc">{description}</p>
        <button className="splash-card-btn">{buttonText}</button>
      </div>
  )
}

export default LandingCard;
