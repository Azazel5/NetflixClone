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

  const checkAuthAndSetBrowseComponent = (Component, propsObject) => {
    return (authContext.authenticated || localStorage.getItem('profileSelected')) ?
      <Component {...propsObject} /> :
      <h1>Sorry you're not authenticated</h1>
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/browse" render={() => checkAuthAndSetBrowseComponent(Browse, { route: '/browse' })}>
        </Route>
        <Route exact path="/browse/tv" render={() => checkAuthAndSetBrowseComponent(Browse, { route: '/browse/tv' })}>
        </Route>
        <Route exact path="/browse/movies" render={() => checkAuthAndSetBrowseComponent(Browse, { route: '/browse/movies' })}>
        </Route>
        <Route exact path="/browse/latest" render={() => checkAuthAndSetBrowseComponent(Browse, { route: '/browse/latest' })}>
        </Route>
        <Route exact path="/search" render={() => checkAuthAndSetBrowseComponent(Browse, { route: '/search' })}>
        </Route>
        <Route exact path="/login" component={Login}>
        </Route>
        <Route exact path="/" component={LandingSection}>
        </Route>
      </Switch>
    </div >
  );
}
