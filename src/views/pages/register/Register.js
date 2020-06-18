import React from "react";
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  firstname: "",
  lastname: "",
  dob: "",
};

const onSubmit = (values) => {
  console.log(values);
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
});

const Register = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
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
    </div>
  );
};

export default Register;
