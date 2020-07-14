import React from "react";
import "./NavBar.css";

import NetflixLogo from "../../../assets/images/netflix.png";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";


const navBar = props => {
  return (
    <div className="NavBar">
      <img src={NetflixLogo} alt="Logo" />
      <Link to="/login">
        <Button height="34px" width="75px">
          Sign In
      </Button>
      </Link>
    </div>
  );
};

export default navBar;
