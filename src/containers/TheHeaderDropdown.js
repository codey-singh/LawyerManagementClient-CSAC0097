import React, { useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import LocalStorageService from "../_shared/services/LocalStorageService";
import AuthenticationService from "../_shared/services/AuthenticationService";
import { Redirect } from "react-router-dom";

const TheHeaderDropdown = () => {
  const [isAuthenticated, setAuthenticated] = useState(
    AuthenticationService.isAuthenticated()
  );

  function handleClick() {
    LocalStorageService.clearStorage();
    setAuthenticated(false);
  }

  return isAuthenticated ? (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/9.png"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to="/profile">
          <CButton>
            <CIcon name="cil-user" className="mfe-2" />
            My Profile
          </CButton>
        </CDropdownItem>
        <CDropdownItem to="/change-password">
          <CButton>
            <CIcon name="cil-settings" className="mfe-2" />
            Change Password
          </CButton>
        </CDropdownItem>
        <CDropdownItem>
          <CButton onClick={handleClick}>
            <CIcon name="cil-user" className="mfe-2" />
            Log Out
          </CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  ) : (
    <Redirect to="/login" />
  );
};

export default TheHeaderDropdown;
