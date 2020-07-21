import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./hoc/ScrollToTop/ScrollToTop";
import AuthenticationContextProvider from './context/Authentication'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
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

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
