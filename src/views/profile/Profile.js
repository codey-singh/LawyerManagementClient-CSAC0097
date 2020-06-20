import React, { useEffect, useState } from "react";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CCardFooter,
  CButton,
  CAlert,
} from "@coreui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "../../_shared/services/Axios";
import AuthenticationService from "../../_shared/services/AuthenticationService";
import CustomInput from "../../_shared/components/CustomInput";
import CustomSelect from "../../_shared/components/CustomSelect";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email id is required")
    .email("Invalid email address"),
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  dob: yup.date("Not a valid date").required("DOB is required"),
  phonenumber: yup.string().required().max(10),
  department_id: yup.string().notRequired().nullable(),
  role_id: yup.string().notRequired(),
});

const init = {
  email: "",
  firstname: "",
  lastname: "",
  dob: "",
  phonenumber: "",
  department_id: "",
  role_id: "",
};

function Profile() {
  const [initialValues, setInitialValues] = useState(init);
  const [departments, setdepartments] = useState([]);
  const [roles, setroles] = useState([]);
  const Role = AuthenticationService.getRole();

  useEffect(() => {
    axios.get("/departments").then((data) => {
      setdepartments(data.data);
    });

    axios.get("/roles").then((data) => {
      setroles(data.data);
    });

    axios.get("/profile").then((data) => {
      console.log(data);
      let dataProfile = {
        email: "",
        firstname: "",
        lastname: "",
        dob: "",
        phonenumber: "",
        department_id: "",
        role_id: "",
        ...data.data,
      };
      setInitialValues(dataProfile);
    });
  }, []);

  return (
    <CRow>
      <CCol md={8}>
        <CCard>
          <CCardHeader>Profile</CCardHeader>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                axios.patch("/profile", values).then((data) => {
                  console.log(data);
                  setSubmitting(false);
                });
              }}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              {(props) => (
                <Form>
                  <CustomInput label="Email" id="email" name="email" />
                  <CustomInput
                    label="Firstname"
                    id="firstname"
                    name="firstname"
                  />
                  <CustomInput label="Lastname" id="lastname" name="lastname" />
                  <CustomInput
                    label="Date of birth"
                    id="dob"
                    name="dob"
                    type="date"
                  />
                  <CustomInput
                    label="Phone Number"
                    id="phonenumber"
                    type="tel"
                    name="phonenumber"
                  />
                  <CustomSelect
                    label="Department"
                    id="department_id"
                    name="department_id"
                    custom
                    disabled={["MANAGER", "GENERAL"].indexOf(Role) !== -1}
                  >
                    <option value="">Choose a Department</option>
                    {departments.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </CustomSelect>
                  <CustomSelect
                    custom
                    label="Role"
                    id="role_id"
                    name="role_id"
                    disabled={["MANAGER", "GENERAL"].indexOf(Role) !== -1}
                  >
                    <option value="">Choose a Role</option>
                    {roles.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.role}
                      </option>
                    ))}
                  </CustomSelect>
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
      {["MANAGER", "GENERAL"].indexOf(Role) !== -1 ? (
        <CCol md={4}>
          <CCard>
            <CCardBody className="text-center">
              {["GENERAL"].indexOf(Role) !== -1 ? (
                <>
                  <CAlert color="success">Accepted</CAlert>
                  <CAlert color="danger">Declined</CAlert>
                  <CAlert color="warning">Pending</CAlert>
                </>
              ) : (
                <CButton type="button" size="md" color="success">
                  Request Elevated Access
                </CButton>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      ) : null}
    </CRow>
  );
}

export default Profile;
