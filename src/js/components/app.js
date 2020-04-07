import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import GlobalState from "../context/global-context";

import "../../scss/main.scss";
import Header from "./Header";
import Index from "./Index";
import Single from "./Single";
import Profile from "./Profile";
import Login from "./Users/login";
import Register from "./Users/register";
import Footer from "./Footer";

import { PrivateRoute } from './PrivateRoute';

import { setCurrentUser } from "./../";

const App = () => {

  // localStorage.removeItem('user');

  return (
    <BrowserRouter>
      <GlobalState>
        <Header />
        
        <Switch>
          <Route exact path="/" component={Index} />
          <PrivateRoute exact path="/profil" component={Profile} />
          <Route exact path="/zaloguj-sie" component={Login} />
          <Route exact path="/zaloz-konto" component={Register} />
          <Route exact path="/status/:id" component={Single} />
        </Switch>
        <Footer />
      </GlobalState>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
