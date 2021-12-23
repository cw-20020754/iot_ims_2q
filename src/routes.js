import React from "react";
import DashboardPage from "./pages/DashboardPage";
import DeviceIntegratedMonitoringPage from "./pages/DeviceIntegratedMonitoringPage";
import {
  CertPolicyManagementPage,
  CertPolicyManagementDetailPage,
  FirmwareManagementDetailPage,
  FirmwareManagementPage,
  FotaHistroySearchPage,
  FotaPolicyManagementDetailPage,
  FotaPolicyManagementPage,
  FotaStatusSearchPage,
} from "./pages/FotaPage";

const routes = [
  { path: "/", exact: true, name: "" },
  { path: "/dashboard", name: "Dashboard", component: DashboardPage },
  {
    path: "/deviceMonitoring",
    name: "DeviceMonitoring",
    component: DeviceIntegratedMonitoringPage,
  },
  { path: "/fota", name: "Fota", exact: true },
  {
    path: "/fota/firmwareManagement",
    name: "Firmware 관리",
    component: FirmwareManagementPage,
  },
  {
    path: "/fota/firmwareManagementDetail",
    name: "Firmware 관리 상세",
    component: FirmwareManagementDetailPage,
  },
  {
    path: "/fota/policyManagement",
    name: "Fota 정책관리",
    component: FotaPolicyManagementPage,
  },
  {
    path: "/fota/policyManagementDetail",
    name: "Fota 정책관리 상세",
    component: FotaPolicyManagementDetailPage,
  },
  {
    path: "/fota/certPolicyManagement",
    name: "인증서 정책관리",
    component: CertPolicyManagementPage,
  },
  {
    path: "/fota/certPolicyManagementDetail",
    name: "인증서 정책관리 상세",
    component: CertPolicyManagementDetailPage,
  },
  {
    path: "/fota/FotaStatusSearchPage",
    name: "상태조회",
    component: FotaStatusSearchPage,
  },
  { path: "/fota/status", name: "Status", component: FotaStatusSearchPage },
  { path: "/fota/history", name: "History", component: FotaHistroySearchPage },
];

export default routes;
