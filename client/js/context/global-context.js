import React, { Component } from "react";

import AuthContext from "./auth-context";

const GlobalState = (props) => {
  const checkAuth = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  };

  

  return (
    <AuthContext.Provider value={checkAuth}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default GlobalState;
