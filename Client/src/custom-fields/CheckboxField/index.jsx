import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

CheckboxField.defaultProps = {
  type: "",
  label: "",
  placeholder: "",
  disabled: false,
};

function CheckboxField(props) {
  const { field, type, label, disabled } = props;
  const { name } = field;

  return (
    <FormGroup>
      <div className="custom-control custom-checkbox">
        <Input
          className="custom-control-input"
          id={name}
          {...field}
          type={type}
          disabled={disabled}
        />
        <Label className="custom-control-label" htmlFor={name}>
          {label}
        </Label>
      </div>
    </FormGroup>
  );
}
export default CheckboxField;
