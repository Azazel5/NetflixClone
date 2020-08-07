import React from "react";
import "./NavBar.css";

import NetflixLogo from "../../../assets/images/netflix.png";
import Button from "../../UI/Button/Button";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faBell } from "@fortawesome/free-solid-svg-icons";
import Search from '../../../containers/Search/Search'


const navBar = props => {
  const { navigation, profileDropdown, navDropdown, loginButton } = props

  let navTiles = null
  let flexStyle = { justifyContent: 'space-between' }

  if (navigation) {
    navTiles = (
      <>
        <div className="LinkContainer">
          <NavLink className="inactive" activeClassName="active" to="/browse" exact>Home</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/tv" exact>TV Shows</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/movies" exact>Movies</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/latest" exact>Latest</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/list" exact>My List</NavLink>
          {navDropdown}
        </div>

        <div className="OptionsContainer">
          <Search />
          <span style={{ fontWeight: '350' }}>KIDS</span>
          <FontAwesomeIcon size="lg" icon={faGift} />
          <FontAwesomeIcon size="lg" icon={faBell} />
          {profileDropdown}
        </div>
      </>
    )
  }

  return (
    <div className="NavBar" style={flexStyle}>
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

export default navBar;
