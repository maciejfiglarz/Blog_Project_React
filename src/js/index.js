import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import "../scss/main.scss";

import App from "./components/app";
import reducers from "./store";

// import createBrowserHistory from "history/createBrowserHistory"; const
// history = createBrowserHistory()


// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const loggerMiddleware = createLogger();

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
});
