import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { authService } from "../../services/auth/index";

Dashboard.propTypes = {};

function Dashboard(props) {
  const handleButtonClick = () => {
    authService.logout();
  };

  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi Admin!</h1>
      <p>You're logged in with React & JWT!!</p>
      <h3>Users from secure api end point:</h3>

      <p>
        <Button onClick={handleButtonClick}>Logout</Button>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default Dashboard;
