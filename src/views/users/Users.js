/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CLink,
  CSelect,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import DataTable from "react-data-table-component";
import axios from "../../_shared/services/Axios";
import CIcon from "@coreui/icons-react";
import AuthenticationService from "../../_shared/services/AuthenticationService";

import memoize from "memoize-one";
import ContextButton from "../../_shared/components/ContextButton";

const FilterComponent = ({ filterText, onFilter, className }) => (
  <>
    <input
      id="search"
      type="text"
      className={className}
      placeholder="Filter By Name"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

const contextActions = memoize((selectedRows, deleteSelected) => (
  <>
    <ContextButton
      key="1"
      text="Delete"
      color="danger"
      selectedRows={selectedRows}
      clickHandler={deleteSelected}
    />
  </>
));

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
  const [filterText, setFilterText] = React.useState("");
  const filteredItems = data.filter(
    (item) =>
      item.firstname &&
      item.firstname.toLowerCase().includes(filterText.toLowerCase())
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  const role = AuthenticationService.getRole();

  const deleteSelected = async (selectedRows) => {
    let confirmation = window.confirm("Do you want to delete these user(s)?");
    if (confirmation && !!selectedRows) {
      selectedRows = selectedRows.map((row) => row._id);
      await axios.delete(`/users/?_ids=${selectedRows.join()}`);
      setClearSelectedRows(!clearSelectedRows);
      fetchUsers(1);
    } else {
      setClearSelectedRows(!clearSelectedRows);
    }
  };

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
            <div className="row">
              <div className="col-10">
                <div className="form-inline">
                  <div className="form-group mr-2">
                    <CLabel htmlFor="dept">Department</CLabel>
                  </div>
                  <div className="form-group mr-2">
                    <CSelect
                      custom
                      name="dept"
                      id="dept"
                      value={department}
                      onChange={handleDeptChange}
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                  <div className="form-group mr-2">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-magnifying-glass" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <FilterComponent
                        type="text"
                        placeholder="Search Users"
                        className="form-control-inline"
                        onFilter={(e) => setFilterText(e.target.value)}
                        filterText={filterText}
                      ></FilterComponent>
                    </CInputGroup>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="float-right">
                  {["ADMIN"].indexOf(role) !== -1 ? (
                    <CLink
                      to="/users/create"
                      className="btn btn-sm btn-primary"
                    >
                      <CIcon name="cil-user"></CIcon> Create User
                    </CLink>
                  ) : null}
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={filteredItems || data}
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
              contextActions={
                ["ADMIN"].indexOf(role) !== -1
                  ? contextActions(selectedRows, deleteSelected)
                  : null
              }
              onSelectedRowsChange={(props) =>
                setSelectedRows(props.selectedRows)
              }
              clearSelectedRows={clearSelectedRows}
            ></DataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
