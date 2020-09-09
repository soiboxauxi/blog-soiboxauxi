import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

Dashboard.propTypes = {};

function Dashboard(props) {
  const data = useSelector((state) => state.data);
  const authentication = useSelector((state) => state.authentication);
  console.log(data);
  console.log(authentication);
  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi Admin!</h1>
      <p>You're logged in with React & JWT!!</p>
      <h3>Users from secure api end point:</h3>

      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

export default Dashboard;
