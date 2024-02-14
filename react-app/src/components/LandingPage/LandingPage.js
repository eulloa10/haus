import React from 'react';
import NavBar from '../../components/SplashPage/NavBar/NavBar';
import SplashBody from '../SplashPage/SplashBody/SplashBody';
import LandingImage from '../LandingImage';
import LandingFooter from '../LandingFooter/LandingFooter';


const LandingPage = () => {
  return (
    <div className="landing">
      <NavBar />
      <LandingImage />
      <SplashBody />
      <LandingFooter />
    </div>
  )
}

export default LandingPage;
