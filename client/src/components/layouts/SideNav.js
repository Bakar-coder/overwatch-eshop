import React from 'react';
import {Link} from "react-router-dom";
import { MdShoppingCart } from 'react-icons/md';

const SideNav = ({isOpen, user, logoutUser, state, setState, pathname, cart, handleNavToggle}) => {

  return (
    <div className={isOpen ? 'side-nav side-nav-open' : 'side-nav'}>
      <div className="nav-header"/>
      <ul className='list-group'>
        <li className='list-item'>
          <Link onClick={() => handleNavToggle()} to='/' className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li className='list-item'>
          <Link onClick={() => handleNavToggle()}
            to='/products'
            className={pathname === '/products' ? 'active' : ''}>
            Products
          </Link>
        </li>
        <li className='list-item'>
          <Link onClick={() => handleNavToggle()} to='/shop' className={pathname === '/shop' ? 'active' : ''}>
            Shop
          </Link>
        </li>
        <li className='list-item'>
          <Link onClick={() => handleNavToggle()}
            to={user ? '/cart': '/users/login'}
            className={pathname === '/cart' ? 'active' : ''}>
            <MdShoppingCart />
            Cart{' '}
            {cart && cart.length > 0 && (
              <span className='badge badge-warning'>{cart.length}</span>
            )}
          </Link>
        </li>

        <li className='list-item'>
          <Link onClick={() => handleNavToggle()}
            to='/contact'
            className={pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </li>

        {user && user.admin && (
          <li className='list-item'>
            <Link onClick={() => handleNavToggle()}
              to='/admin/add-product'
              className={pathname === '/admin/add-product' ? 'active' : ''}>
              Add-Product
            </Link>
          </li>
        )}
        {user && user.admin && (
          <li className='list-item'>
            <Link onClick={() => handleNavToggle()}
              to='/admin/product'
              className={pathname === '/admin/product' ? 'active' : ''}>
              Admin Products
            </Link>
          </li>
        )}
        {user && (
          <li className='list-item'>
            <Link onClick={() => handleNavToggle()}
              to={`/profile/${user.firstName} ${user.lastName}`}
              className={
                pathname === `/profile/${user.firstName} ${user.lastName}`
                  ? 'active'
                  : ''
              }>
              {user.username}
            </Link>
          </li>
        )}

        {!user && (
          <li className='list-item'>
            <Link onClick={() => handleNavToggle()}
              to='/users/register'
              className={pathname === '/users/register' ? 'active' : ''}>
              Signup
            </Link>
          </li>
        )}
        {!user && (
          <li className='list-item'>
            <Link onClick={() => handleNavToggle()} to='/users/login'  className={pathname === '/users/register' ? 'active' : ''}>
              Signin
            </Link>
          </li>
        )}
        {user && (
          <li className='list-item'>
            <a  onClick={() => {handleNavToggle(), logoutUser()}}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
