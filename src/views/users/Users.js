/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CLink,
  CForm,
  CFormGroup,
  CButton,
  CInput,
  CSelect,
  CLabel,
} from "@coreui/react";
import DataTable from "react-data-table-component";
import axios from "../../_shared/services/Axios";
import CIcon from "@coreui/icons-react";
import AuthenticationService from "../../_shared/services/AuthenticationService";

const Users = () => {
  const columns = [
    {
      name: "Id",
      selector: "_id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "firstname",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true,
    },
    {
      name: "Access Type",
      selector: "role_id.role",
      sortable: true,
    },
    {
      name: "Department",
      cell: (row) => (
        <span>{row.department_id ? row.department_id.name : "N/A"}</span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      sortable: false,
      cell: (row) => (
        <>
          <CLink to={"/users/" + row._id} className="btn btn-sm btn-primary">
            <CIcon size="sm" name="cil-user" /> View
          </CLink>
          &nbsp;
          <CLink to={"/profile/" + row._id} className="btn btn-sm btn-warning">
            <CIcon name="cil-pencil" /> Edit
          </CLink>
        </>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const role = AuthenticationService.getRole();

  const fetchUsers = async (page) => {
    setLoading(true);
    const response = await axios.get(
      `/users?page=${page}&per_page=${perPage}&department=${department}`
    );
    setData(response.data.users);
    setTotalRows(response.data.count);
    setLoading(false);
  };

  const fetchDepartments = async (page) => {
    const response = await axios.get(`/departments`);
    setDepartments(response.data);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handleDeptChange = (e) => {
    setDepartment(e.target.value);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `/users?page=${page}&per_page=${newPerPage}`
    );

    setData(response.data.users);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
    fetchDepartments();
  }, [department]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
            {["ADMIN"].indexOf(role) !== -1 ? (
              <CForm className="form-inline">
                <CFormGroup className="form-group mr-2">
                  <CLabel htmlFor="dept">Department</CLabel>
                </CFormGroup>
                <CFormGroup className="form-group mr-2">
                  <CSelect
                    name="dept"
                    id="dept"
                    value={department}
                    onChange={handleDeptChange}
                  >
                    <option value="">ALL</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </CSelect>
                </CFormGroup>
                <CFormGroup className="form-group mr-2">
                  <CInput
                    type="text"
                    placeholder="Search Users"
                    className="form-control-inline"
                  ></CInput>
                  <CButton className="btn btn-sm btn-primary">
                    <CIcon name="cil-magnifying-glass"></CIcon>
                  </CButton>
                  &nbsp;
                  <CLink to="/users/create" className="btn btn-sm btn-primary">
                    <CIcon name="cil-user"></CIcon> Create User
                  </CLink>
                </CFormGroup>
              </CForm>
            ) : null}
            <DataTable
              columns={columns}
              data={data}
              title="Users"
              progressPending={loading}
              pagination
              paginationServer
              selectableRowsHighlight
              highlightOnHover
              paginationTotalRows={totalRows}
              selectableRows
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
            ></DataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
