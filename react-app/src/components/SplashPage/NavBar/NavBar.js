
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, Link } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css';
import LoginFormModal from '../../LoginFormModal';
import SignUpFormModal from '../../SignUpFormModal';
import User from '../../User';
import * as sessionActions from '../../../store/session';
import HouseMeLogo from '../../../assets/zillow-logo.svg';
import ProfileDefaultIcon from '../../../assets/profile-default-icon.svg'

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showSessionOptions, setShowSessionOptions] = useState(false);

  const demoLogin = async () => {
    await dispatch(sessionActions.login("demo@aa.io", "password"));
    history.push("/");
  };

  const sessionOptionsHandler = () => {
    setShowSessionOptions(!showSessionOptions);
  }

  return (
    <nav>
      <ul className='splash-nav-all'>
        <ul className="splash-nav-other-links">
          <li className="splash-nav">
            <NavLink to='/me' exact={true} activeClassName='active'>
              Buy
            </NavLink>
          </li>
          <li className="splash-nav sell-link">
            <NavLink to='/me' exact={true} activeClassName='active'>
              Sell
            </NavLink>
          </li>
        </ul>
        <ul className="splash-nav-home-link">
          <li className="splash-nav home-link">
              <NavLink to='/' exact={true} activeClassName='active'>
                <img src={HouseMeLogo} alt="logo"/>
              </NavLink>
            </li>
        </ul>
        <ul className="splash-nav-auth-links">
          {!user && (
            <>
              <li className="splash-nav">
              <LoginFormModal />
              </li>
              <li className="splash-nav">
                <SignUpFormModal />
              </li>
              <li className="splash-nav">
                <NavLink to='/' exact={true} activeClassName='active' onClick={demoLogin}>
                  Demo
                </NavLink>
              </li>
            </>
          )}
          { user && (
            <img className="prof-icon" src={ProfileDefaultIcon} alt="prof-icon" onClick={sessionOptionsHandler}/>
            )
          }
          {user && showSessionOptions && (
              <ul className="session-options">
                <li className="session-items">
                  <Link className="session-link">
                    My Listings
                  </Link>
                </li>
                <li className="session-items">
                  <Link className="session-link">
                  My Offers
                  </Link>
                </li>
                <li className="session-items">
                  <Link className="session-link">
                    My Tours
                  </Link>
                </li>
                <li className="session-items">
                  <Link className="session-link session-fav-link">
                    My Favorites
                  </Link>
                </li>
                <li className='session-logout-btn session-items'>
                  <LogoutButton />
                </li>
              </ul>
          )}
        </ul>
      </ul>
    </nav>
  );
}

export default NavBar;
