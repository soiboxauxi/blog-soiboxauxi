import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

InputField.defaultProps = {
  type: "",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && (
        <Label className="small mb-1" htmlFor={name}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
