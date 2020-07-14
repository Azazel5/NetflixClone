import React, { useState } from "react";
import "./Login.css";

import LoginBackground from "../../assets/images/landingPage.jpg";
import NetflixLogo from "../../assets/images/netflix.png";
import { TextField } from "@material-ui/core";
import Button from "../../components/UI/Button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

/**
 * The login component, which validates the email and password
 * fields and uses a controlled form. Uses material UI for the
 * textfields.
 */
const Login = props => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailTouched, setEmailIsTouched] = useState(false);
  const [passwordTouched, setPasswordIsTouched] = useState(false);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmailInput(value);
    } else if (name === "password") {
      setPasswordInput(value);
    }
  };

  // For setting error spans once any of the fields are touched.
  const fieldBlurHandler = event => {
    const { name } = event.target;
    if (name === "email") {
      setEmailIsTouched(true);
    } else if (name === "password") {
      setPasswordIsTouched(true);
    }
  };

  let [emailSpan, passwordSpan] = [null, null];
  if (emailTouched) {
    emailSpan = (
      <span style={{ color: "red", fontSize: "13px" }}>
        Please enter a valid email or phone number.
      </span>
    );
  }

  if (passwordTouched) {
    passwordSpan = (
      <span style={{ color: "red", fontSize: "13px" }}>
        Your password must contain between 4 and 60 characters.
      </span>
    );
  }

  if (emailInput.length) {
    emailSpan = null;
  }

  if (passwordInput.length <= 60 && passwordInput.length >= 4) {
    passwordSpan = null;
  }

  return (
    <div
      className="Login"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <img src={NetflixLogo} alt="Logo" />
      <div className="LoginCard">
        <h1>Sign In</h1>
        <form>
          <TextField
            name="email"
            className="textField"
            id="standard-basic"
            label="Email or phone number"
            variant="filled"
            type="email"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={emailInput}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {emailSpan}

          <TextField
            name="password"
            className="textField"
            id="filled-basic"
            label="Password"
            variant="filled"
            type="password"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={passwordInput}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {passwordSpan}

          <Button link="/" height="45px" width="100%">
            Sign In
          </Button>

          <FormControlLabel
            style={{ marginLeft: "-12px" }}
            control={
              <Checkbox style={{ color: "rgb(229, 9, 20)" }} name="checkedB" />
            }
            label="Remember Me"
          />
          <span style={{ float: "right", marginTop: "35px" }}>Need help?</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
