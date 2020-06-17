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
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
function Profile() {
  return (
    <CRow>
      <CCol md={8}>
        <CCard>
          <CCardHeader>Profile</CCardHeader>
          <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="email">Email Address</CLabel>
              <CInput
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="password">Password</CLabel>
              <CInput id="password" type="password" />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="firstname">Firstname</CLabel>
              <CInput id="firstname" placeholder="firstname" />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="lastname">Lastname</CLabel>
              <CInput id="lastname" placeholder="lastname" />
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
              <CInput id="phonenumber" placeholder="Phone number" />
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
        </CCard>
      </CCol>
      <CCol md={4}>
        <CCard></CCard>
      </CCol>
    </CRow>
  );
}

export default Profile;
