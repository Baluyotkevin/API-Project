import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  

  return (
    <>
      <div className="icon-container">
    <div className='nav-button'>
      <i className="fa-solid fa-bars" onClick={openMenu}></i>
    </div>
      <button className='menu-button' onClick={openMenu}>
      <i className="fa-solid fa-user-ninja"></i>
      </button>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* <li>Hello {user.username}</li> */}
            <li>Hello {user.firstName}</li>
            {/* {user.lastName} */}
            <li>{user.email}</li>
            <li>
              <Link exact to={'/spots/current'}>
                Manage Spots
              </Link>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
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