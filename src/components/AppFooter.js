import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">
          &copy; Copyright Coway Co., Ltd. All Rights reserved.{" "}
        </span>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
