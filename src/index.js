import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./hoc/ScrollToTop/ScrollToTop";
import AuthenticationContextProvider from './context/Authentication'

const app = (
  <BrowserRouter>
    <React.StrictMode>
      <ScrollToTop>
        <AuthenticationContextProvider>
          <App />
        </AuthenticationContextProvider>
      </ScrollToTop>
    </React.StrictMode>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
