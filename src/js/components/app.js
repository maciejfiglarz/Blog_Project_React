import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./../helper/history";

import GlobalState from "../context/global-context";

import "../../scss/main.scss";
import Header from "./Header";
import Index from "./Index";
import Single from "./Single";
import Profile from "./Profile";
import Login from "./Users/login";
import Register from "./Users/register";
import Footer from "./Footer";

import { PrivateRoute } from "./PrivateRoute";

import { setCurrentUser } from "./../";

const App = () => {
  // history.listen((location, action) => {
  //   // clear alert on location change
  //   // props.clearAlerts();
  // });

  return (
    // <BrowserRouter>
    <Router history={history}>
      <GlobalState>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Index} />
            <PrivateRoute exact path="/profil" component={Profile} />
            <Route exact path="/zaloguj-sie" component={Login} />
            <Route exact path="/zaloz-konto" component={Register} />
            <Route exact path="/status/:id" component={Single} />
          </Switch>
        </div>
        <Footer />
      </GlobalState>
      {/* </BrowserRouter> */}
    </Router>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
