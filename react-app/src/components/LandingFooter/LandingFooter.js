import React from 'react';
import Github from '../../assets/github.svg';
import LinkedIn from '../../assets/linkedin.svg';
import './LandingFooter.css';


const LandingFooter = () => {
  return (<div className="footer-container">
            <a href="https://github.com/eulloa10/houseme-project">
              <img className="footer-icon" src={Github} alt="github icon"/>
            </a>
            <a href="https://www.linkedin.com/in/edgarulloa/">
              <img className="footer-icon" src={LinkedIn} alt="linkedin icon"/>
            </a>
          </div>)
}

export default LandingFooter;
