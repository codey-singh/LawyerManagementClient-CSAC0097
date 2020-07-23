import React from "react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CImg,
  CLink,
} from "@coreui/react";
import bhajan from "../../../assets/images/bhajan.jpg";
import kiran from "../../../assets/images/kiran.jpg";
import nandini from "../../../assets/images/nandini.jpg";
import CIcon from "@coreui/icons-react";
function About() {
  const devs = [
    {
      name: "Bhajanpreet Singh",
      github: "https://github.com/codey-singh",
      linkedin: "https://www.linkedin.com/in/bhajanpreet-singh/",
      twitter: "https://twitter.com/codey_singh",
      imgName: bhajan,
    },
    {
      name: "Amritha Susan Jacob",
      github: "",
      linkedin: "",
      twitter: "",
      imgName: "",
    },
    {
      name: "Kiran Joseph",
      github: "https://github.com/kiranjm",
      linkedin: "https://www.linkedin.com/in/kiranjosephmaliekal/",
      twitter: "",
      imgName: kiran,
    },
    {
      name: "Nandini",
      github: "https://github.com/nandini1338",
      linkedin: "https://www.linkedin.com/in/nandini-kanojia-814170187/",
      twitter: "https://twitter.com/nandini962",
      imgName: nandini,
    },
  ];

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>About Us</h1>
                  <p>
                    This project is created as a part of Work Integrated
                    Learning project for Summer 2020 Term of CSAT
                    (cpl-5559-csat-csac-0097-v2).
                  </p>
                  <h2 className="mb-4">Our Team</h2>
                  <p>Meet our team</p>
                  <CRow>
                    {devs.map((dev) => (
                      <CCol xs="3" className="text-center">
                        <div className="dev">
                          <CImg
                            height="200"
                            width="auto"
                            alt="Developer Image"
                            src={dev.imgName}
                          ></CImg>
                        </div>
                        <hr />
                        <p>{dev.name}</p>
                        <div className="social">
                          <CLink href={dev.github}>
                            <CIcon name="cib-github"></CIcon>
                          </CLink>
                          &nbsp;&nbsp;&nbsp;
                          <CLink href={dev.linkedin}>
                            <CIcon name="cib-linkedin"></CIcon>
                          </CLink>
                          &nbsp;&nbsp;&nbsp;
                          <CLink href={dev.twitter}>
                            <CIcon name="cib-twitter"></CIcon>
                          </CLink>
                        </div>
                      </CCol>
                    ))}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default About;
