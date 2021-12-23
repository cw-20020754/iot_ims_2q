import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import * as icon from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div style={{ display: "flex" }}>
                      <h2 style={{ color: "#00a7e1" }}>Coway</h2>
                      <p
                        className="text-medium-emphasis"
                        style={{
                          color: "#8a93a2",
                          padding: "14px",
                          fontSize: "1rem",
                        }}
                      >
                        통합 관제
                      </p>
                    </div>
                    {/* <p>Sign In to your account</p> */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilAt} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLocationPin} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Location"
                        autoComplete="current-location"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        {/* <CFormCheck id="flexCheckDefault" label="아이디/성명/지역 저장" className="float-end mb-2 fs-6" /> */}
                        <CButton
                          className="px-4 mt-1"
                          style={{
                            textAlign: "center",
                            width: "100%",
                            background: "none",
                            color: "#00a7e1",
                            border: "1px solid #00a7e1",
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right"> */}
                      {/*  <CButton color="link" className="px-0"> */}
                      {/*    Forgot password? */}
                      {/*  </CButton> */}
                      {/* </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5"
                style={{ width: "44%", background: "#00a7e1" }}
              >
                <CCardBody>
                  <div>
                    <p style={{ fontSize: "14px" }}>
                      {" "}
                      ※ 시스템 보안강화를 위해 시스템 로그인시 추가정보를
                      입력하여 주시기 바랍니다.
                      <br />
                      ( 추가입력요청사항 : 성명 / 사용자 팀명 / 사용자 접속지역
                      )
                      <br />
                      <br />
                      * 로그인화면에 보여지는 예시와 같이 입력 후 로그인버튼을
                      클릭하여 로그인
                      <br />
                      <br />* 본 시스템은 구글 Chrome 전용입니다. 타
                      브라우저(Explorer, Firefox 등)에서 정상동작하지 않을 수
                      있습니다.
                    </p>
                  </div>
                  <h1 className="login_logo">coway</h1>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginPage;
