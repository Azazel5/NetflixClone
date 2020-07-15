import React from "react";
import "./styles.css";

import LandingSection from "./containers/LandingSection/LandingSection";
import Login from "./containers/Login/Login";
import Browse from './containers/Browse/Browse'
import { Switch, Route } from "react-router-dom";
import { useContext } from 'react'
import { AuthenticationContext } from './context/Authentication'

export default function App() {
  const authContext = useContext(AuthenticationContext)

  return (
    <div className="App">
      <Switch>
        <Route path="/browse">
          {(authContext.authenticated || localStorage.getItem('profileSelected')) ? <Browse /> : <h1>Sorry you're not authenticated</h1>}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <LandingSection />
        </Route>
      </Switch>
    </div>
  );
}
