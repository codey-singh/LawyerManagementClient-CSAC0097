import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CAlert,
  CLink,
  CFormGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../../../_shared/services/Axios";
import { Redirect } from "react-router-dom";
import CustomToast, { Toast } from "../../../_shared/components/CustomToast";
const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  firstname: "",
  lastname: "",
  dob: "",
  captchaText: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email id is required")
    .email("Invalid email address"),
  password: yup.string().required("Password is required").min(6),
  repeatPassword: yup
    .string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match.", function (value) {
      return this.parent.password === value;
    }),
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  dob: yup.date("Not a valid date").required("DOB is required"),
  captchaText: yup.string(),
});

const Captcha = (prop) => {
  return <span dangerouslySetInnerHTML={{ __html: prop.svg }}></span>;
};

const Register = () => {
  const [registered, setRegistered] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaRef, setCaptchaRef] = useState("");

  useEffect(() => {
    axios.get("/captcha").then((response) => {
      setCaptcha(response.data.captcha);
      console.log(response);
      setCaptchaRef(response.data.captchaRef);
    });
  }, []);

  const onSubmit = (values) => {
    axios
      .post("/auth/register", { ...values, captchaRef })
      .then((data) => {
        if (!data.data.error) {
          setRegistered(true);
        } else {
          Toast.error("Captcha is not correct.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return registered ? (
    <Redirect to="/login" />
  ) : (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {registered ? (
                  <CAlert color="success">
                    Registered Successfully{" "}
                    <CLink to="/login">Go to Login page</CLink>
                  </CAlert>
                ) : null}
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      {...formik.getFieldProps("email")}
                      invalid={formik.touched.email && !!formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <CInvalidFeedback>{formik.errors.email}</CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      {...formik.getFieldProps("password")}
                      invalid={
                        formik.touched.password && !!formik.errors.password
                      }
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <CInvalidFeedback>
                        {formik.errors.password}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      {...formik.getFieldProps("repeatPassword")}
                      invalid={
                        formik.touched.repeatPassword &&
                        !!formik.errors.repeatPassword
                      }
                    />
                    {formik.touched.repeatPassword &&
                    formik.errors.repeatPassword ? (
                      <CInvalidFeedback>
                        {formik.errors.repeatPassword}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="First Name"
                      autoComplete="firstname"
                      name="firstname"
                      {...formik.getFieldProps("firstname")}
                      invalid={
                        formik.touched.firstname && !!formik.errors.firstname
                      }
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <CInvalidFeedback>
                        {formik.errors.firstname}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Last Name"
                      autoComplete="lastname"
                      name="lastname"
                      {...formik.getFieldProps("lastname")}
                      invalid={
                        formik.touched.lastname && !!formik.errors.lastname
                      }
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <CInvalidFeedback>
                        {formik.errors.lastname}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-calendar" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="date"
                      placeholder="DOB"
                      name="dob"
                      {...formik.getFieldProps("dob")}
                      invalid={formik.touched.dob && !!formik.errors.dob}
                    />
                    {formik.touched.dob && formik.errors.dob ? (
                      <CInvalidFeedback>{formik.errors.dob}</CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CFormGroup>
                    <Captcha svg={captcha} />
                  </CFormGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-pencil" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Captcha text"
                      autoComplete="captchaText"
                      name="captchaText"
                      {...formik.getFieldProps("captchaText")}
                      invalid={
                        formik.touched.captchaText &&
                        !!formik.errors.captchaText
                      }
                    />
                    {formik.touched.captchaText && formik.errors.captchaText ? (
                      <CInvalidFeedback>
                        {formik.errors.captchaText}
                      </CInvalidFeedback>
                    ) : null}
                  </CInputGroup>
                  <CButton
                    type="submit"
                    disabled={!formik.isValid}
                    color="success"
                    block
                  >
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CustomToast />
    </div>
  );
};

export default Register;
