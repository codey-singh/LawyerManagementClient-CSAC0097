import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthenticationService from "../../../_shared/services/AuthenticationService";
import LocalStorageService from "../../../_shared/services/LocalStorageService";

import axios from "../../../_shared/services/Axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Redirect } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .email("Username should be a valid email"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const onSubmit = (values) => {
    axios
      .post("/auth/login", values)
      .then((data) => {
        console.log(data.data);
        LocalStorageService.setToken(data.data);
        setAuthenticated(true);
      })
      .catch((error) => {
        setAuthenticated(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [isAuthenticated, setAuthenticated] = useState(
    AuthenticationService.isAuthenticated()
  );

  return isAuthenticated ? (
    <Redirect to="/welcome" />
  ) : (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={!!formik.errors.username}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <CInvalidFeedback>
                          {formik.errors.username}
                        </CInvalidFeedback>
                      ) : null}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        invalid={!!formik.errors.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <CInvalidFeedback>
                          {formik.errors.password}
                        </CInvalidFeedback>
                      ) : null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={!formik.isValid}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CLink to="/register">
                          <CButton color="link" className="px-0">
                            Create Account
                          </CButton>
                        </CLink>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
