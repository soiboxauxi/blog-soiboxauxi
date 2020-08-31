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
  disabled: false,
  value: false,
};

function CheckboxField(props) {
  const { field, type, label, disabled } = props;
  const { name, value } = field;
  return (
    <FormGroup>
      <div className="custom-control custom-checkbox">
        <Input
          className="custom-control-input"
          id={name}
          {...field}
          checked={value}
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
