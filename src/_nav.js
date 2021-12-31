import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilLaptop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilGraph,
  cilSpeedometer,
  cilStar,
  cilTags,
  cilArrowRight,
  cilVerticalAlignBottom,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "대시보드",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  {
    component: CNavItem,
    name: "디바이스 통합 모니터링",
    to: "/deviceMonitoring",
    icon: <CIcon icon={cilLaptop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "FOTA",
    to: "/charts",
    icon: <CIcon icon={cilVerticalAlignBottom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Firmware 관리",
        to: "/fota/firmwareManagement",
        // icon: (
        //   <CIcon icon={cilArrowRight} customClassName="nav-icon" size={"sm"} />
        // ),
      },
      {
        component: CNavItem,
        name: "Fota 정책관리",
        to: "/fota/policyManagement",
      },
      {
        component: CNavItem,
        name: "인증서 정책관리",
        to: "/fota/certPolicyManagement",
      },
      {
        component: CNavItem,
        name: "상태조회",
        to: "/fota/fotaStatusSearchPage",
      },
      {
        component: CNavItem,
        name: "이력조회",
        to: "/fota/fotaHistorySearchPage",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "빅데이터조회",
    to: "/searchBigData",
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "일자별 디바이스별 수집건수",
        to: "/base/accordion",
      },
      {
        component: CNavItem,
        name: "빅데이터분석 일별통계",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "빅데이터분석 월별통계",
        to: "/base/cards",
      },
      {
        component: CNavItem,
        name: "안테나 기간별 통계",
        to: "/base/carousels",
      },
      {
        component: CNavItem,
        name: "안테나 일자별 빅데이터 유무",
        to: "/base/collapses",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "디바이스 조회 및 제어",
    to: "/buttons",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "센싱데이터 조회",
        to: "/buttons/buttons",
      },
      {
        component: CNavItem,
        name: "상태이력 조회(청정기)",
        to: "/buttons/button-groups",
      },
      {
        component: CNavItem,
        name: "상태이력 조회(정수기)",
        to: "/buttons/dropdowns",
      },
      {
        component: CNavItem,
        name: "제어이력 조회",
        to: "/buttons/dropdowns",
      },
      {
        component: CNavItem,
        name: "접속이력 조회",
        to: "/buttons/dropdowns",
      },
      {
        component: CNavItem,
        name: "에러이력 조회",
        to: "/buttons/dropdowns",
      },
      {
        component: CNavItem,
        name: "디바이스 제어",
        to: "/buttons/dropdowns",
      },
      {
        component: CNavItem,
        name: "주문번호 수정",
        to: "/base/forms",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "기타 조회",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "설치로그 조회",
        to: "/forms/form-control",
      },
      {
        component: CNavItem,
        name: "일별데이터 조회",
        to: "/forms/select",
      },
      {
        component: CNavItem,
        name: "Checks & Radios",
        to: "/forms/checks-radios",
      },
      {
        component: CNavItem,
        name: "임계치 조회",
        to: "/forms/range",
      },
      {
        component: CNavItem,
        name: "OAQ업데이트 조회",
        to: "/forms/input-group",
      },
      {
        component: CNavItem,
        name: "운영디바이스 조회",
        to: "/forms/floating-labels",
      },
      {
        component: CNavItem,
        name: "운영디바이스 연결상태 조회",
        to: "/forms/layout",
      },
      {
        component: CNavItem,
        name: "로그인이력 조회",
        to: "/forms/validation",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Device Management",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "디바이스 리스트",
        to: "/forms/form-control",
      },
      {
        component: CNavItem,
        name: "공장출고 등록",
        to: "/forms/select",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Simulator",
    to: "/deviceMonitoring",
    icon: <CIcon icon={cilLaptop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Admin 관리",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "유저관리",
        to: "/icons/coreui-icons",
        // badge: {
        //   color: "success",
        //   text: "NEW",
        // },
      },
      {
        component: CNavItem,
        name: "코드관리",
        to: "/icons/flags",
      },
      {
        component: CNavItem,
        name: "메뉴관리",
        to: "/icons/brands",
      },
      {
        component: CNavItem,
        name: "프로토콜 관리",
        to: "/icons/brands",
      },
    ],
  },
];

export default _nav;
