import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NotFound from "components/NotFound";
import MainPage from "./pages/Main";

Login.propTypes = {};

function Login(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage}></Route>
      <Route path={`${match.url}/login`} component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Login;
