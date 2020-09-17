import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authService } from "../../services/auth/index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = authService.getAuthToken();

  const isAuth = () => {
    // Check token
    if (authToken) {
      const authExpriedAt = authService.getAuthExpried(authToken);
      if (authExpriedAt > Date.now() / 1000) {
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
