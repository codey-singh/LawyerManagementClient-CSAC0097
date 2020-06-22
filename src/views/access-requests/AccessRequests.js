/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "../../_shared/services/Axios";

import DataTable from "react-data-table-component";
import { CCard, CCardBody, CRow, CCol, CBadge } from "@coreui/react";

function AccessRequests() {
  const columns = [
    {
      name: "Id",
      selector: "_id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "user.firstname",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "user.lastname",
      sortable: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => (
        <>{<CBadge color={getBadge(row.status)}>{row.status}</CBadge>}</>
      ),
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "warning";
      case "APPROVED":
        return "success";
      case "DECLINED":
        return "danger";
      default:
        return "primary";
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchRequests = async (page) => {
    setLoading(true);
    const response = await axios.get(
      `/accessrequests?page=${page}&per_page=${perPage}`
    );
    setData(response.data.requests);
    setTotalRows(response.data.count);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchRequests(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
      `/accessrequests?page=${page}&per_page=${newPerPage}`
    );

    setData(response.data.requests);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests(1);
  }, []);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
            <DataTable
              title="Access Requests"
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
            ></DataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default AccessRequests;
