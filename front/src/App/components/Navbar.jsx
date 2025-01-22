import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { getSessionUser } from '../../Services/UserApi';

const Navbar  = ({active}) => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getSessionUser();
            setUser(userData);
            
        } catch (err) {
            setUser(null);
            console.error('Failed to fetch user:', err);
        }
    };

    fetchUser();
}, []);


  return (
<div>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar py-4" role="banner">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div className="ml-auto">
              <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className={active === 'home' ? 'active' : ''} ><Link to="/" className="nav-link">Home</Link></li>
                  <li className={active === 'matches' ? 'active' : ''} ><Link to="/matches" className="nav-link">Matches</Link></li>
                  <li className={active === 'selectmatches' ? 'active' : ''} ><Link to="/selectMatches" className="nav-link">Select Match</Link></li>
                  <li className={active === 'contact' ? 'active' : ''} ><Link to="/contact" className="nav-link">Contact</Link></li>
                  {user ? (
                      <li className={active === 'profile' ? 'active' : ''}><Link to="/profile" className="nav-link">Profile</Link></li>
                    ) : (
                      <li className={active === 'signin' ? 'active' : ''}><Link to="/signin" className="nav-link">Sign In</Link></li>
                  )}
                </ul>
              </nav>

              <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white">
                <span className="icon-menu h3 text-white"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
