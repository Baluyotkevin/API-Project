import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  

  return (
    <>
      <div className="icon-container">
      <div className='fa-container'>
        <i className="fa-solid fa-bars" onClick={openMenu}></i>
        <i className="fa-solid fa-user-ninja" onClick={openMenu}></i>
    </div>

    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='hello'>
            <div className='greetings'>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            </div>
              <Link exact to={'/spots/current'}>
                <li onClick={closeMenu}>Manage Spots</li>
              </Link>
              <Link exact to={'/reviews/current'}>
                <li className='manage' onClick={closeMenu}>Manage Reviews</li>
              </Link>
            <li className='navLogout-cont'>
                <button className='navLogout' onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className='modal-menu'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              
              modalComponent={<LoginFormModal />}
            />

            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>

    </>
  );
}

export default ProfileButton;