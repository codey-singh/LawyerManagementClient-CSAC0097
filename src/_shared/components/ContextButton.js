import React from "react";
import { CButton } from "@coreui/react";

const ContextButton = (props) => {
  return (
    <CButton
      className="ml-2"
      color={props.color}
      onClick={() => props.clickHandler(props.selectedRows)}
    >
      {props.text}
    </CButton>
  );
};
export default ContextButton;
