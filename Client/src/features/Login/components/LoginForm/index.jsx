import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../custom-fields/InputField/index.jsx";
import CheckboxField from "../../../../custom-fields/CheckboxField/index.jsx";
import * as Yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
};

function LoginForm(props) {
  const { initialValues } = props;

  const validationSchema = Yup.object().shape({
    inputEmailAddress: Yup.string()
      .email("Field must be a valid email")
      .required("This field is required."),
    inputPassword: Yup.string().required("This field is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        return (
          <Form>
            <FastField
              name="inputEmailAddress"
              component={InputField}
              label="Email"
              type="email"
              placeholder="Enter email address"
            />
            <FastField
              name="inputPassword"
              component={InputField}
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <FastField
              name="rememberPasswordCheck"
              component={CheckboxField}
              label="Remember password"
              type="checkbox"
            />
            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
              <a className="small" href="password.html">
                Forgot Password?
              </a>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
