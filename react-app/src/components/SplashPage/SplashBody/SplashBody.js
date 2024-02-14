
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginFormModal from '../../LoginFormModal';
import './SplashBody.css';


import BuyHome from '../../../assets/haus_buy_home.png';
import SellHome from '../../../assets/haus_sell_home.png';
import TourHome from '../../../assets/haus_tour_home.png';
import LandingCard from '../../LandingCard/LandingCard';


const SplashBody = () => {
  const user = useSelector(state => state.session.user);

  return (
    <>
    <div className="splash-body">
      <div className="splash-cards">
        {
          user ? (
            <>
            <Link to="/listings" className="option-card-container">
              <LandingCard
                header="Buy a home"
                description="Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else."
                image={BuyHome}
                buttonText="Browse homes"
              />
            </Link>
            <Link to="/me/listings" className="option-card-container">
              <LandingCard
                header="Sell a home"
                description="Ready to sell? Take advantage of our network and expertise."
                image={SellHome}
                buttonText="Sell a home"
              />
            </Link>
            <Link to="/listings" className="option-card-container">
              <LandingCard
                header="Tour a home"
                description="See a home you like? Schedule a tour now with one of our agents."
                image={TourHome}
                buttonText="Find a home to tour"
              />
            </Link>
            </>
          ) : (
              <>
                <Link to="/listings" className="option-card-container">
                  <LandingCard
                    header="Buy a home"
                    description="Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else."
                    image={BuyHome}
                    buttonText="Browse homes"
                  />
                </Link>
                <Link to="/me/listings" className="option-card-container">
                  <LandingCard
                    header="Sell a home"
                    description="Ready to sell? Take advantage of our network and expertise."
                    image={SellHome}
                    buttonText="Sell a home"
                  />
                </Link>
                <Link to="/listings" className="option-card-container">
                  <LandingCard
                  header="Tour a home"
                  description="See a home you like? Schedule a tour now with one of our agents."
                  image={TourHome}
                  buttonText="Find a home to tour"
                  />
                </Link>
                {/* <LoginFormModal sellCardRedirect={true}/> */}
                {/* <LoginFormModal tourCardRedirect={true}/> */}
              </>
          )
        }
      </div>
    </div>
   </>
  );
}

export default SplashBody;
