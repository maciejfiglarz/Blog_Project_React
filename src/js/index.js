import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import promise from 'redux-promise';
import '../scss/main.scss'

import App from './components/app';
import reducers from './reducers';

// import createBrowserHistory from "history/createBrowserHistory"; const
// history = createBrowserHistory()

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

document.addEventListener('DOMContentLoaded', function () {

    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
        <App/>
    </Provider>
    , document.getElementById('app'));

});
