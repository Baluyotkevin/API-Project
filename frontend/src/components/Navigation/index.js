import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import AirbnbLogo from '../images/airbnbLogo.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="nav-container">
    <ul className='nav-list'>
      <li className="nav-logo"> 
        <NavLink exact to='/'><img className='airbnbLogo' src={AirbnbLogo}/></NavLink> 
      </li>
      {sessionUser !== null ? <NavLink to='/spots/new'><li>Create a new Spot</li> </NavLink>: null}
      {isLoaded && (
        <li className='nav-profile-button'>
          <ProfileButton  user={sessionUser} />
        </li>
      )}

    </ul>

    </div>
  );
}

export default Navigation;