
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css';
import LoginFormModal from '../../LoginFormModal';
import SignUpFormModal from '../../SignUpFormModal';
import HouseMeLogo from '../../../assets/zillow-logo.svg'

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  // const [ showLoginModal, setShowLoginModal] = useState(false)

  console.log("------------USER------------", user);

  return (
    <nav>
      <ul className='splash-nav-all'>
        <ul className="splash-nav-other-links">
        </ul>
        <ul className="splash-nav-home-link">
          <li className="splash-nav home-link">
              <NavLink to='/' exact={true} activeClassName='active'>
                <img src={HouseMeLogo} alt="logo"/>
              </NavLink>
            </li>
        </ul>
        <ul className="splash-nav-auth-links">
          <li className="splash-nav">
            <LoginFormModal />
          </li>
          <li className="splash-nav">
            <SignUpFormModal />
          </li>
          <li className="splash-nav">
            <NavLink to='/me' exact={true} activeClassName='active'>
              Demo
            </NavLink>
          </li>
          {/* <li className="splash-nav">
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          { user && (<li className="splash-nav">
            <LogoutButton />
            </li>)
          }
        </ul>
      </ul>
    </nav>
  );
}

export default NavBar;
