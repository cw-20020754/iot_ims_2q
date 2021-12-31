import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const AlertMessage = (props) => {
  const { title, message, isSuccess } = props;

  return (
    <div className="mb-3">
      <Alert
        severity={isSuccess ? "success" : "error"}
        style={
          isSuccess
            ? { background: "rgb(229 246 253)" }
            : { background: "#fdeded" }
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default AlertMessage;
