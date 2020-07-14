import React from "react";
import "./styles.css";

import LandingSection from "./containers/LandingSection/LandingSection";
import Login from "./containers/Login/Login";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
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
