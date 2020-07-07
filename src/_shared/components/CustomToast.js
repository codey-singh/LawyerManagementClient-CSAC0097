import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = toast;

function CustomToast() {
  return <ToastContainer position="top-center" />;
}

export default CustomToast;
