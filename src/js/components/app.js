import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";


import "../../scss/main.scss";
import Header from "./Header";
import Index from "./Index";
import Single from "./Single";
import Login from "./Users/login";
import Register from "./Users/register";
import Footer from "./Footer";

import {setCurrentUser } from "./../"

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
      
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/zaloguj-sie" component={Login} />
          <Route exact path="/zaloz-konto" component={Register} />
          <Route exact path="/status/:id" component={Single} />
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
