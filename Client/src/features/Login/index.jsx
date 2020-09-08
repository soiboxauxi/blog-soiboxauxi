import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import NotFound from "../../components/NotFound/index.jsx";
import Main from "./pages/Main/index.jsx";

function Login() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={Main}></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Login;
