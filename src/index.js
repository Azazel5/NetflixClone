import React from "react";
import ReactDOM from "react-dom";

import App from "App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "hoc/ScrollToTop/ScrollToTop";
import AuthenticationContextProvider from 'context/Authentication'
import { Provider } from 'react-redux'
import store from 'store/reducers/store'


const app = (
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.StrictMode>
        <ScrollToTop>
          <AuthenticationContextProvider>
            <App />
          </AuthenticationContextProvider>
        </ScrollToTop>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

if(window.Cypress) {
  window.store = store 
}

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
