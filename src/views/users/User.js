import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../../_shared/services/Axios";

const User = ({ match }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/users/" + match.params.id).then((data) => {
      const {
        _id,
        department_id,
        dob,
        email,
        firstname,
        lastname,
        phonenumber,
        role_id,
      } = data.data;

      setUser({
        id: _id,
        department: department_id ? department_id.name : "N/A",
        dob,
        email,
        firstname,
        lastname,
        phonenumber,
        role: role_id ? role_id.role : "",
      });
    });
  }, [match.params.id]);

  const userDetails = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];
  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User Id: <strong>{match.params.id}</strong>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key.toUpperCase()}`}</td>
                      <td>
                        <strong>{value || ""}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <CLink to="/users" className="btn btn-primary">
              <CIcon name="cil-people"></CIcon> Back to Users
            </CLink>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
