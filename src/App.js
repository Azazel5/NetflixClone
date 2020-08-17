import React, { useContext } from "react";
import "./styles.css";

import LandingSection from "containers/LandingSection/LandingSection";
import Login from "containers/Login/Login";
import Browse from 'containers/Browse/Browse'
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from 'context/Authentication'
import NotFoundPage from 'components/StaticPages/NotFoundPage/NotFoundPage'

export default function App() {
  const authContext = useContext(AuthenticationContext)

  const checkAuthAndSetBrowseComponent = (propsObject) => {
    return (authContext.authenticated || localStorage.getItem('profileSelected')) ?
      <Browse {...propsObject} /> :
      <Redirect to="/login" />
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/browse" render={() => checkAuthAndSetBrowseComponent({ route: '/browse' })}>
        </Route>
        <Route exact path="/browse/tv" render={() => checkAuthAndSetBrowseComponent({ route: '/browse/tv' })}>
        </Route>
        <Route exact path="/browse/movies" render={() => checkAuthAndSetBrowseComponent({ route: '/browse/movies' })}>
        </Route>
        <Route exact path="/browse/latest" render={() => checkAuthAndSetBrowseComponent({ route: '/browse/latest' })}>
        </Route>
        <Route exact path="/browse/list" render={() => checkAuthAndSetBrowseComponent({ route: '/browse/list' })}>
        </Route>
        <Route exact path="/search" render={() => checkAuthAndSetBrowseComponent({ route: '/search' })}>
        </Route>
        <Route exact path="/login" component={Login}>
        </Route>
        <Route exact path="/" component={LandingSection}>
        </Route>
        <Route exact component={NotFoundPage}>
        </Route>
      </Switch>
    </div >
  );
}
