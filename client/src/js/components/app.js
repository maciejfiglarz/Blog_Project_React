import React, { useEffect } from "react";
import {  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../helper/history";

import GlobalState from "../context/global-context";

import "../../scss/main.scss";
import Header from "./Header";
import HeaderDesktop from "./HeaderDesktop";
import Index from "./Index";
import Single from "./Single";
import Profile from "./Profile";
import Login from "./Users/login";
import Register from "./Users/register";
import Footer from "./Footer";

import WaitingRoom from "./WaitingRoom";

import AdminPost from "./Admin/Post";

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
    <div id="App">
      <Router history={history}>
        <GlobalState>
          <Header />
          <HeaderDesktop />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/poczekalnia" component={WaitingRoom} />
              {/* <PrivateRoute exact strict path="/profil/:id" component={Profile} /> */}
              <Route exact strict path="/profile/:id" component={Profile} />
              <Route exact path="/zaloguj-sie" component={Login} />
              <Route exact path="/zaloz-konto" component={Register} />
              <Route exact strict path="/post/:id" component={Single} />
              <PrivateRoute exact strict path="/dodaj" component={Creator} />
              <Route exact path="/admin/post" component={AdminPost} />
            </Switch>
          </div>
          <Footer />
        </GlobalState>
        {/* </BrowserRouter> */}
      </Router>
    </div>
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
