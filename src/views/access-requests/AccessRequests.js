/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "../../_shared/services/Axios";
import memoize from "memoize-one";
import DataTable from "react-data-table-component";
import { CCard, CCardBody, CRow, CCol, CBadge } from "@coreui/react";
import ContextButton from "../../_shared/components/ContextButton";

const rowDisabledCriteria = (row) =>
  ["APPROVED", "DECLINED"].indexOf(row.status) !== -1;
const contextActions = memoize(
  (selectedRows, approveSelected, declineSelected) => (
    <>
      <ContextButton
        key="1"
        text="Approve"
        color="success"
        selectedRows={selectedRows}
        clickHandler={approveSelected}
      />
      <ContextButton
        key="2"
        text="Decline"
        color="danger"
        selectedRows={selectedRows}
        clickHandler={declineSelected}
      />
    </>
  )
);

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
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  const approveSelected = async (selectedRows) => {
    if (!!selectedRows) {
      selectedRows = selectedRows.map((row) => ({
        _id: row._id,
        user: row.user._id,
      }));
      await axios.patch("/accessrequests", {
        status: "APPROVED",
        selectedRows,
      });
      setClearSelectedRows(!clearSelectedRows);
      fetchRequests(1);
    }
  };
  const declineSelected = async (selectedRows) => {
    if (!!selectedRows) {
      selectedRows = selectedRows.map((row) => ({
        _id: row._id,
        user: row.user._id,
      }));
      await axios.patch("/accessrequests", {
        status: "DECLINED",
        selectedRows,
      });
      setClearSelectedRows(!clearSelectedRows);
      fetchRequests(1);
    }
  };
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
              contextActions={contextActions(
                selectedRows,
                approveSelected,
                declineSelected
              )}
              onSelectedRowsChange={(props) =>
                setSelectedRows(props.selectedRows)
              }
              highlightOnHover
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              selectableRowDisabled={rowDisabledCriteria}
              clearSelectedRows={clearSelectedRows}
            ></DataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
export default AccessRequests;
