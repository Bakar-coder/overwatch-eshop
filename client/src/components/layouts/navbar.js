import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { MdShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../state/actions/authActions';
import SideNav from './SideNav';

const Navbar = ({ user, cart, logoutUser, history }) => {
  const { pathname } = history.location;
  const [state, setState] = React.useState({ isOpen: false });
  const { isOpen } = state;

  const handleNavToggle = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };
  return (
    <Fragment>
      <nav className='navbar'>
        <div className='navbar-content'>
          <h3 className='logo'>
            <Link to='/' className='active'>
              OverWatch
            </Link>
          </h3>
          {!isOpen && (
            <IoMdMenu className='menu' onClick={() => handleNavToggle()} />
          )}

          {isOpen && (
            <IoMdClose className='menu' onClick={() => handleNavToggle()} />
          )}

          <ul className='list-group'>
            <li className='list-item'>
              <Link to='/' className={pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li className='list-item'>
              <Link
                to='/products'
                className={pathname === '/products' ? 'active' : ''}>
                Products
              </Link>
            </li>
            <li className='list-item'>
              <Link to='/shop' className={pathname === '/shop' ? 'active' : ''}>
                Shop
              </Link>
            </li>
            <li className='list-item'>
              <Link
                to={user ? '/cart' : '/users/login'}
                className={pathname === '/cart' ? 'active' : ''}>
                <MdShoppingCart />
                Cart{' '}
                {cart && cart.length > 0 && (
                  <span className='badge badge-warning'>{cart.length}</span>
                )}
              </Link>
            </li>

            <li className='list-item'>
              <Link
                to='/contact'
                className={pathname === '/contact' ? 'active' : ''}>
                Contact
              </Link>
            </li>

            {user && user.admin && (
              <li className='list-item'>
                <Link
                  to='/admin/orders'
                  className={pathname === '/admin/orders' ? 'active' : ''}>
                  Orders
                </Link>
              </li>
            )}
            {user && user.admin && (
              <li className='list-item'>
                <Link
                  to='/admin/add-product'
                  className={pathname === '/admin/add-product' ? 'active' : ''}>
                  Add-Product
                </Link>
              </li>
            )}
            {user && user.admin && (
              <li className='list-item'>
                <Link
                  to='/admin/product'
                  className={pathname === '/admin/product' ? 'active' : ''}>
                  Admin Products
                </Link>
              </li>
            )}
            {user && (
              <li
                className='list-item'
                style={{
                  borderLeft: '2px solid #ffc107',
                  paddingLeft: '1rem'
                }}>
                <Link
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
                <Link
                  to='/users/register'
                  className={pathname === '/users/register' ? 'active' : ''}>
                  Signup
                </Link>
              </li>
            )}
            {!user && (
              <li className='list-item'>
                <Link to='/users/login' className='btn btn-primary'>
                  Signin
                </Link>
              </li>
            )}
            {user && (
              <li className='list-item'>
                <a className='btn btn-primary' onClick={() => logoutUser()}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <SideNav
        isOpen={isOpen}
        user={user}
        logoutUser={logoutUser}
        state={state}
        setState={setState}
        pathname={pathname}
        cart={cart}
        handleNavToggle={handleNavToggle}
      />
      <div
        className={isOpen ? 'back-drop back-drop-open' : 'back-drop'}
        onClick={() => handleNavToggle()}
      />
    </Fragment>
  );
};

function mapStateToProps({ auth, products }) {
  return { user: auth.user, cart: products.cart };
}

function mapDIspatch(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDIspatch)(withRouter(Navbar));
