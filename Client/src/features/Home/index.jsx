import React from "react";
import { Link } from "react-router-dom";

index.propTypes = {};

function index(props) {
  return (
    <div>
      <Link to="/dashboard">dashboard</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default index;
