import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import RelaxLogo from '../images/relax-icon-14.jpg'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-list'>
      <li className="nav-logo"> 
        <NavLink exact to='/'><img className='airbnbLogo' src={RelaxLogo}/></NavLink> 
      </li>

         <div className='spotCreator'>
      {sessionUser !== null ? <NavLink to='/spots/new'><button>Create a new Spot</button></NavLink>: null}
          </div>
      {isLoaded && (

        <li className='nav-profile-button'>
            <ProfileButton  user={sessionUser} />
        </li>

      )}

    </ul>
  );
}

export default Navigation;