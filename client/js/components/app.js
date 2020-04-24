import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../helper/history";

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

import userThunks from "../store/user/thunks";
import Creator from "./Creator";

const App = (props) => {
  useEffect(() => {
    const isLogged = props.user.isLogged;
    if (isLogged) {
      props.setInitialData(props.user);
    }
  }, [props.setInitialData]);

  return (
    // <BrowserRouter>
    <Router history={history}>
      <GlobalState>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Index} />
            {/* <PrivateRoute exact strict path="/profil/:id" component={Profile} /> */}
            <Route exact strict path="/profil" component={Profile} />
            <Route exact path="/zaloguj-sie" component={Login} />
            <Route exact path="/zaloz-konto" component={Register} />
            <Route exact strict path="/post/:id" component={Single} />
            <Route exact strict path="/dodaj" component={Creator} />
          </Switch>
        </div>
        <Footer />
      </GlobalState>
      {/* </BrowserRouter> */}
    </Router>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
  setInitialData: userThunks.setInitialData,
};

export default connect(mapStateToProps, actionCreators)(App);
