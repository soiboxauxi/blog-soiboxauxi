import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

const APP_API = process.env.REACT_APP_API_ENDPOINT;

const login = async (email, password) => {
  const cookies = new Cookies();
  const rememberMe = true;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe }),
  };
  return fetch(APP_API + `/Account/login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      const { success, data } = response;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("data", JSON.stringify(data));

      // const expires = new Date();
      // expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

      var decode;
      if (success) {
        decode = jwt.decode(data.accessToken);
      }
      // Trường hợp cần Date
      //if (jwt.exp < Date.now() / 1000) {
      //  // do something
      //}

      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
      cookies.set("authToken", data.accessToken, {
        path: "/",
        expires,
        maxAge: 1000,
        //domain: "https://play.bukinoshita.io",
        //secure: true,
        //httpOnly: true,
      });
      console.log(cookies.get("authToken"));
      return {
        authToken: data.accessToken,
        expriedAt: decode.exp,
        authUserState: { success: true },
      };
    });
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("data");
};

const getAll = () => {
  //const requestOptions = {
  //  method: "GET",
  //  headers: authHeader(),
  //};
  //return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userService = {
  login,
  logout,
  getAll,
};
