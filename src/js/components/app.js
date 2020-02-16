import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "../../scss/main.scss";
import Header from "./Header";
import Index from "./Index";
import Simulator from "./Simulator";
import AddPost from "./AddPost";
import Login from "./Users/login";
import Register from "./Users/register";

import { setCurrentUser } from "./../actions/users_action";
import { BACKEND_URL } from "./../constants/types";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/logowanie" component={Login} />
          <Route exact path="/rejestracja" component={Register} />
          <Route exact path="/dodaj-post" component={AddPost} />
          <Route exact path="/symulator" component={Simulator} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, { setCurrentUser })(App);
