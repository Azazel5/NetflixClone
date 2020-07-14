import React from "react";
import "./NavBar.css";

import NetflixLogo from "../../../assets/images/netflix.png";
import Button from "../../UI/Button/Button";

const navBar = props => {
  return (
    <div className="NavBar">
      <img src={NetflixLogo} alt="Logo" />
      <Button link="/login" height="34px" width="75px">
        Sign In
      </Button>
    </div>
  );
};

export default navBar;
