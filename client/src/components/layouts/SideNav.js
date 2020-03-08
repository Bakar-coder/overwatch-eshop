import React from 'react';
import {Link} from "react-router-dom";

const SideNav = ({isOpen, user, logoutUser, state, setState}) => {
  return (
    <div className={isOpen ? 'side-nav side-nav-open' : 'side-nav'}>
      <div className="nav-header"/>
      <ul className="list-group">
        <li className="list-item">
          <Link onClick={() => setState({ ...state, isOpen: !state.isOpen})} to="/">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link onClick={() => setState({ ...state, isOpen: !state.isOpen })} to="/about">
            About
          </Link>
        </li>
        <li className="list-item">
          <Link onClick={() =>
            setState({ ...state, isOpen: !state.isOpen })} to="/services">
            Services
          </Link>
        </li>
        <li className="list-item">
          <Link onClick={() => setState({ ...state, isOpen: !state.isOpen })} to="blog">
            Blog
          </Link>
        </li>
        <li className="list-item">
          <Link onClick={() => setState({ ...state, isOpen: !state.isOpen })} to="/contact">
            Contact
          </Link>
        </li>
        {user && <li className="list-item">
          <Link onClick={() =>
            setState({ ...state, isOpen: !state.isOpen })} to={`/profile/${user.firstName} ${user.lastName}`}>
            {user.username}
          </Link>
        </li>}
        { !user && <li className="list-item"><Link onClick={() =>
          setState({ ...state, isOpen: !state.isOpen })} to="/users/register">Signup</Link></li>}
        { !user && <li
          className="list-item">
          <Link onClick={() =>
            setState({ ...state, isOpen: !state.isOpen })} to="/users/login" >Signin</Link>
        </li>}
        { user && <li className="list-item">
          <Link to='#'  onClick={() => {
            setState({ ...state, isOpen: !state.isOpen });
            logoutUser();
          }}>Logout</Link>
        </li>}
      </ul>
    </div>
  );
};

export default SideNav;
