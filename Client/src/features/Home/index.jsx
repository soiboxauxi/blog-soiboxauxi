import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/auth/index";
import { userService } from "../../services/user/index";

Home.propTypes = {};

function Home(props) {
  const data_fecth = userService.getAll();
  console.log(data_fecth);

  useEffect(() => {
    const unregisterAuthObserver = async () => {
      const authToken = await authService.getAuthToken();
      if (!authToken) {
        // user logs out, handle something here
        console.log("User is not logged in");
        return;
      }
      console.log("Logged in user token: ", authToken);
    };

    unregisterAuthObserver();
  }, []);

  return (
    <div>
      <Link to="/dashboard">dashboard</Link>
      <Link to="/login">Login</Link>

      <p>{data_fecth}</p>
    </div>
  );
}

export default Home;
