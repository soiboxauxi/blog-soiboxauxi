import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/auth/index";
import { userService } from "../../services/user/index";

Home.propTypes = {};

function Home(props) {
  const [dataFecth, setdataFecth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        userService.getAll().then((res) => {
          setdataFecth(res);
        });

        //setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };
    fetchData();
  }, [dataFecth]);

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

      <p>{JSON.stringify(dataFecth)}</p>
    </div>
  );
}

export default Home;
