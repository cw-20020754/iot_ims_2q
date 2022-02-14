import React, { lazy } from "react";
const DefaultLayout = lazy(() => import("../layout/DefaultLayout"));
const FirmwareManage = lazy(() => import("../pages/Fota/FirmwareManage"));
const FotaPolicy = lazy(() => import("../pages/Fota/FotaPolicy"));
const CertPolicy = lazy(() => import("../pages/Fota/CertPolicy"));
const FotaStatus = lazy(() => import("../pages/Fota/FotaStatus"));
const FotaHistory = lazy(() => import("../pages/Fota/FotaHistory"));

// ==============================|| FOTA ROUTING ||============================== //

const FotaRoutes = {
  path: "/fota",
  element: <DefaultLayout />,
  children: [
    {
      path: "/fota/firmwareManage",
      element: <FirmwareManage />,
    },
    {
      path: "/fota/fotaPolicy",
      element: <FotaPolicy />,
    },
    {
      path: "/fota/certPolicy",
      element: <CertPolicy />,
    },
    {
      path: "/fota/statusCheck",
      element: <FotaStatus />,
    },
    {
      path: "/fota/historyCheck",
      element: <FotaHistory />,
    },
  ],
};

export default FotaRoutes;
