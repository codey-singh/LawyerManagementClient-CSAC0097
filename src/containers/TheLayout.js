import React from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import CustomToast from "../_shared/components/CustomToast";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
      <CustomToast />
    </div>
  );
};

export default TheLayout;
