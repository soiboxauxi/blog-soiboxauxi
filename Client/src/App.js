import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/PrivateRoute/index";
import Dashboard from './features/Dashboard/index';
import Home from './features/Home/index';
import Login from './features/Login/index';

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home} path={'/'} />
            <Route component={Login} path={'/login'} />
            <PrivateRoute component={Dashboard} path={'/dashboard'} loginPath={'/login'} exact />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default hot(App);
