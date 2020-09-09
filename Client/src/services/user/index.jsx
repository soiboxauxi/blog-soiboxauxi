const APP_API = process.env.REACT_APP_API_ENDPOINT;

const login = async (email, password) => {
  const rememberMe = true;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe }),
  };
  return fetch(APP_API + `/Account/login`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("data", JSON.stringify(data));
      console.log(data);
      return data;
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
        //logout();
        //location.reload(true);
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
