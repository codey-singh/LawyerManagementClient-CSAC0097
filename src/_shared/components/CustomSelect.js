import React from "react";
import { useField } from "formik";
import { CLabel, CSelect, CFormGroup } from "@coreui/react";

function CustomSelect({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <CFormGroup>
      <CLabel htmlFor={props.id || props.name}>{label}</CLabel>
      <CSelect {...field} {...props} invalid={meta.touched && !!meta.error} />
      {meta.touched && !!meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </CFormGroup>
  );
}

export default CustomSelect;
