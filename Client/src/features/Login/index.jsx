import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userConstants } from "../../constants/user.constants";
import LoginForm from "../../features/Login/components/LoginForm/index";
import { authentication } from "../../features/Login/reducers/authenticationSlice";
import {
  failure,
  login,
  request,
  success,
} from "../../features/Login/reducers/userSlice";
import { userService } from "../../services/user/index";
import "./style.scss";

function Login() {
  const initialValues = {
    inputEmailAddress: "",
    inputPassword: "",
    rememberPasswordCheck: false,
  };

  // reset login status
  userService.logout();

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = async (values) => {
    const { inputEmailAddress, inputPassword } = values;
    if (inputEmailAddress && inputPassword) {
      dispatch(request({ inputEmailAddress }));

      userService.login(inputEmailAddress, inputPassword).then(
        (res) => {
          dispatch(success(inputEmailAddress));
          dispatch(
            authentication({
              statelogin: userConstants.LOGIN_SUCCESS,
              data: res,
            }),
          );
          history.push("/dashboard");
          console.log("Login thành công");
        },
        (error) => {
          dispatch(failure(error));
          dispatch(authentication(userConstants.LOGIN_FAILURE));
          //dispatch(alertActions.error(error));
          console.log("Login thất bại");
        },
      );
    }
  };

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        userLogin(values);
        const action = login(values);
        dispatch(action);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <LoginForm
                        initialValues={initialValues}
                        onSubmit={(values) => handleSubmit(values)}
                      />
                    </div>
                    <div className="card-footer text-center">
                      <div className="small">
                        <a href="register.html">Need an account? Sign up!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2020
                </div>
                <div>
                  <a href="https://www.google.com/">Privacy Policy</a>
                  &middot;
                  <a href="https://www.google.com/">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></script>
      <script src="js/scripts.js"></script>
    </div>
  );
}

export default Login;
