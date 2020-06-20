import React from "react";
import { useField } from "formik";
import { CLabel, CFormGroup, CInput } from "@coreui/react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <CFormGroup>
      <CLabel htmlFor={props.id || props.name}>{label}</CLabel>

      <CInput {...field} {...props} invalid={meta.touched && !!meta.error} />
      {meta.touched && !!meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </CFormGroup>
  );
};

export default CustomInput;
