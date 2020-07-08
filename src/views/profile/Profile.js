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
  CBadge,
} from "@coreui/react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "../../_shared/services/Axios";
import AuthenticationService from "../../_shared/services/AuthenticationService";
import CustomInput from "../../_shared/components/CustomInput";
import CustomSelect from "../../_shared/components/CustomSelect";
import { Redirect } from "react-router-dom";
import { Toast } from "../../_shared/components/CustomToast";

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

const getColor = (status) => {
  switch (status) {
    case "ACTIVE":
      return "warning";
    case "APPROVED":
      return "success";
    case "DECLINED":
      return "danger";
    default:
      break;
  }
};

function Profile({ match }) {
  const [initialValues, setInitialValues] = useState(init);
  const [departments, setdepartments] = useState([]);
  const [roles, setroles] = useState([]);
  const [request, setRequest] = useState({});
  const [redirect, setRedirect] = useState(false);
  const Role = AuthenticationService.getRole();

  const handleRequestAccess = async () => {
    const data = await axios.post("/accessrequests");
    console.log(data.data);
    setRequest(data.data);
  };

  useEffect(() => {
    console.log(match);
    axios.get("/departments").then((data) => {
      setdepartments(data.data);
    });

    axios.get("/roles").then((data) => {
      setroles(data.data);
    });

    axios.get("/accessrequests/my").then((data) => {
      setRequest(data.data);
    });

    let profileUrl = "/profile";
    if (match.params.id) {
      profileUrl = profileUrl + "/" + match.params.id;
    }

    if (match.path !== "/users/create") {
      axios.get(profileUrl).then((data) => {
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
        if (dataProfile.department_id === null) dataProfile.department_id = "";
        setInitialValues(dataProfile);
      });
    }
  }, [match, match.params.id]);

  return redirect ? (
    <Redirect to="/users"></Redirect>
  ) : (
    <CRow>
      <CCol md={8}>
        <CCard>
          <CCardHeader>Profile</CCardHeader>
          <CCardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                let profileUrl = "/profile";
                if (match.params.id) {
                  profileUrl = profileUrl + "/" + match.params.id;
                }

                if (match.path !== "/users/create") {
                  axios
                    .patch(profileUrl, values)
                    .then((data) => {
                      console.log(data);
                      let message =
                        match.path === "/profile/:id"
                          ? "User Saved"
                          : "Profile Saved";
                      Toast.success(message);
                      setSubmitting(false);
                    })
                    .catch((err) => Toast.error(err));
                } else {
                  axios
                    .post("/users", values)
                    .then((data) => {
                      console.log(data);
                      Toast.success("User Created");
                      setSubmitting(false);
                      setRedirect(true);
                    })
                    .catch((err) => Toast.error(err));
                }
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
      {["GENERAL"].indexOf(Role) !== -1 ? (
        <CCol md={4}>
          <CCard>
            <CCardBody className="text-center">
              {["GENERAL"].indexOf(Role) !== -1 && !!request ? (
                <CAlert color={getColor(request.status)}>
                  Your request staus is{" "}
                  <CBadge color={getColor(request.status)}>
                    {request.status}
                  </CBadge>
                </CAlert>
              ) : (
                <CButton
                  type="button"
                  size="md"
                  onClick={handleRequestAccess}
                  color="success"
                >
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
