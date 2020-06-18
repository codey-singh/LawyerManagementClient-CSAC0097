import React from "react";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CCardFooter,
  CButton,
  CAlert,
  CInvalidFeedback,
  CForm,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../_shared/services/Axios";

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
  phonenumber: yup.string().notRequired().max(10),
});

function Profile() {
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
  };

  const onSubmit = (values) => {
    axios
      .patch("/profile", values)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <CRow>
      <CCol md={8}>
        <CCard>
          <CForm onSubmit={formik.handleSubmit}>
            <CCardHeader>Profile</CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="email">Email Address</CLabel>
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
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="password">Password</CLabel>
                <CInput
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  name="password"
                  {...formik.getFieldProps("password")}
                  invalid={formik.touched.password && !!formik.errors.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <CInvalidFeedback>{formik.errors.password}</CInvalidFeedback>
                ) : null}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="repeatPassword">Password</CLabel>
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
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="firstname">Firstname</CLabel>
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
                  <CInvalidFeedback>{formik.errors.firstname}</CInvalidFeedback>
                ) : null}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="lastname">Lastname</CLabel>
                <CInput
                  type="text"
                  placeholder="Last Name"
                  autoComplete="lastname"
                  name="lastname"
                  {...formik.getFieldProps("lastname")}
                  invalid={formik.touched.lastname && !!formik.errors.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <CInvalidFeedback>{formik.errors.lastname}</CInvalidFeedback>
                ) : null}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="accessType">Access Type</CLabel>
                <CSelect custom name="accessType" id="accessType">
                  <option value="null">Choose an access type</option>
                  <option value="1">Lawyer</option>
                  <option value="2">Manager</option>
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="phonenumber">Phone Number</CLabel>
                <CInput
                  type="text"
                  placeholder="Phone Number"
                  autoComplete="phonenumber"
                  name="phonenumber"
                  {...formik.getFieldProps("phonenumber")}
                  invalid={
                    formik.touched.phonenumber && !!formik.errors.phonenumber
                  }
                />
                {formik.touched.phonenumber && formik.errors.phonenumber ? (
                  <CInvalidFeedback>
                    {formik.errors.phonenumber}
                  </CInvalidFeedback>
                ) : null}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="department">Department</CLabel>
                <CSelect custom name="department" id="department">
                  <option value="null">Choose a department</option>
                  <option value="1">Immigration</option>
                  <option value="2">Traffic Tickets</option>
                  <option value="3">Technology</option>
                  <option value="4">Criminal Law</option>
                  <option value="5">Corporate Law</option>
                </CSelect>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="md" color="success">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              &nbsp;
              <CButton type="reset" size="md" color="danger">
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
      <CCol md={4}>
        <CCard>
          <CCardBody className="text-center">
            <CAlert color="success">Accepted</CAlert>
            <CAlert color="danger">Declined</CAlert>
            <CAlert color="warning">Pending</CAlert>
            <CButton type="button" size="md" color="success">
              Request Elevated Access
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Profile;
