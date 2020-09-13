import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.authentication);
  const isAuth = () => {
    console.log(authState);
    // check token
    if (authState.authToken && authState.expriedAt) {
      if (authState.expriedAt > Date.now() / 1000) {
        return true;
      }
    } else {
      return false;
    }
  };

  /*
   * render : return componet "render" if main component null
   */
  const { render } = rest;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          Component ? (
            <Component {...props} />
          ) : render ? (
            <render />
          ) : null
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
