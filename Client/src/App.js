import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import NotFound from './components/NotFound/index.jsx';
import Login from './features/Login/index.jsx';
import Dashboard from './features/Dashboard/index.jsx';

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/"></Redirect>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/login" component={Login}></Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default hot(App);
