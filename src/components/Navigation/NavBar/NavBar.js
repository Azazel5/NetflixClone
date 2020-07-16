import React from "react";
import "./NavBar.css";

import NetflixLogo from "../../../assets/images/netflix.png";
import Button from "../../UI/Button/Button";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGift, faBell } from "@fortawesome/free-solid-svg-icons";
import Dropdown from '../Dropdown/Dropdown'

const navBar = props => {
  let navTiles = null
  let flexStyle = { justifyContent: 'space-between' }
  if (props.navigation) {
    navTiles = (
      <>
        <div className="LinkContainer">
          <NavLink className="inactive" activeClassName="active" exact to="/browse">Home</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/tv" exact>TV Shows</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/movies" exact>Movies</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/latest" exact>Latest</NavLink>
          <NavLink className="inactive" activeClassName="active" to="/browse/list" exact>My List</NavLink>
        </div>

        <div className="OptionsContainer">
          <FontAwesomeIcon size="lg" icon={faSearch} />
          <span style={{fontWeight: '350'}}>KIDS</span>
          <FontAwesomeIcon size="lg" icon={faGift} />
          <FontAwesomeIcon size="lg" icon={faBell} />
          <Dropdown 
            dropdownOpenHandler={props.dropdownOpenHandler}
            dropDownCloseHandler={props.dropDownCloseHandler}
            dropdownOpen={props.dropdownOpen} 
          />
          <button onClick={props.logoutHandler}>Logout</button>
        </div>
      </>
    )
  }

  return (
    <div className="NavBar" style={flexStyle}>
      <img src={NetflixLogo} alt="Logo" />
      {navTiles}
      {props.loginButton && <Link to="/login">
        <Button height="34px" width="75px">
          Sign In
      </Button>
      </Link>}
    </div>
  );
};

export default navBar;
