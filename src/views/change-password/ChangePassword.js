import React, { useState } from "react";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CCardFooter,
  CButton,
} from "@coreui/react";
import { Formik, Form } from "formik";
import axios from "../../_shared/services/Axios";
import * as Yup from "yup";
import CustomInput from "../../_shared/components/CustomInput";
import AuthenticationService from "../../_shared/services/AuthenticationService";
import LocalStorageService from "../../_shared/services/LocalStorageService";
import { Redirect } from "react-router-dom";
import { Toast } from "../../_shared/components/CustomToast";

function ChangePassword() {
  const [isAuthenticated, setAuthenticated] = useState(
    AuthenticationService.isAuthenticated()
  );

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "New Password should be atleast 6 characters"),
    repeatNewPassword: Yup.string()
      .required("Confirm New Password is required")
      .test("passwords-match", "Passwords must match.", function (value) {
        return this.parent.newPassword === value;
      })
      .min(6, "New Password should be atleast 6 characters"),
  });

  return isAuthenticated ? (
    <CRow>
      <CCol md={8}>
        <CCard>
          <CCardHeader>Profile</CCardHeader>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                axios
                  .patch("/users/change-password", values)
                  .then((response) => {
                    if (response.data.error) {
                      Toast.error(
                        "Your entered current password doesn't match with the one in our records. Please try again!"
                      );
                      setSubmitting(false);
                    } else {
                      setSubmitting(false);
                      LocalStorageService.clearStorage();
                      setAuthenticated(false);
                    }
                  });
              }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <CustomInput
                    label="Current Password"
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                  />
                  <CustomInput
                    label="New Password"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                  />
                  <CustomInput
                    type="password"
                    label="Repeat New Password"
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                  />
                  <CFormGroup>
                    <CButton color="success" type="submit">
                      {props.isSubmitting ? "Submitting..." : "Submit"}
                    </CButton>{" "}
                    &nbsp;
                    <CButton color="danger" type="reset">
                      Reset
                    </CButton>
                  </CFormGroup>
                </Form>
              )}
            </Formik>
          </CCardBody>
          <CCardFooter></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  ) : (
    <Redirect to="/login" />
  );
}

export default ChangePassword;
