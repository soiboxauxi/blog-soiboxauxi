import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

const cookies = new Cookies();

const getAuthToken = () => {
  // get token in cookie
  const authToken = cookies.get("authToken");
  if (authToken) return authToken;
  else return null;
};

const getAuthExpried = (authToken) => {
  if (authToken) {
    const decode = jwt.decode(authToken);
    return decode.exp;
  } else {
    return null;
  }
};

const logout = () => {
  cookies.remove("authToken");
};

export const authService = {
  getAuthToken,
  getAuthExpried,
  logout,
};
