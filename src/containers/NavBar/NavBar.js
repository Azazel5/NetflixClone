import React, { useState, useEffect, useCallback } from "react";
import "./NavBar.css";

import { NetflixLogo } from "assets/images/";
import Button from "components/UI/Button/Button";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faBell } from "@fortawesome/free-solid-svg-icons";
import Search from '../Search/Search'


const NavBar = props => {
  const { navigation, profileDropdown, navDropdown, loginButton } = props
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true)

  const scrollNavbarStateHandler = useCallback(() => {
    const navbarAtTop = window.scrollY < 45
    if (navbarAtTop !== isNavbarAtTop) {
      setIsNavbarAtTop(navbarAtTop)
    }
  }, [isNavbarAtTop])

  useEffect(() => {
    document.addEventListener('scroll', scrollNavbarStateHandler)
    return () => {
      document.removeEventListener('scroll', scrollNavbarStateHandler)
    }
  }, [scrollNavbarStateHandler])

  let navTiles = null
  let flexStyle = { justifyContent: 'space-between', backgroundColor: !isNavbarAtTop && 'black' }

  if (navigation) {
    navTiles = (
      <>
        <div className="LinkContainer">
          <div className="Horizontal">
            <NavLink className="inactive" activeClassName="active" to="/browse" exact>Home</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/tv" exact>TV Shows</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/movies" exact>Movies</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/latest" exact>Latest</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/browse/list" exact>My List</NavLink>
          </div>
          <div className="Vertical">
            {navDropdown}
          </div>
        </div>

        <div className="OptionsContainer">
          <Search />
          <span className="ExtraOptions" style={{ fontWeight: '350' }}>KIDS</span>
          <FontAwesomeIcon className="ExtraOptions" size="lg" icon={faGift} />
          <FontAwesomeIcon className="ExtraOptions" size="lg" icon={faBell} />
          {profileDropdown}
        </div>
      </>
    )
  }

  return (
    <div className="NavBar Sticky" style={flexStyle}>
      <img src={NetflixLogo} alt="Logo" />
      {navTiles}
      {loginButton && <Link to="/login">
        <Button
          height="34px"
          width="75px"
          backgroundColor="#e50914"
          textColor="#fff"
        >
          Sign In
      </Button>
      </Link>}
    </div>
  );
};

export default NavBar;
