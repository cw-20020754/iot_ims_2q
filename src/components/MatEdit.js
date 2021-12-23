import {
  deleteCertPolicy,
  deleteFirmware,
  deleteFotaPolicy,
  getCertPolicyList,
  getFirmwareList,
  getFotaPolicyList,
} from "../redux/reducers/fotaInfoSlice";
import { isNull, makeQuery } from "../common/utils/CowayUtils";
import { Button, Collapse } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const MatEdit = ({ category, param, searchOption }) => {
  // console.log("category >> ", category, param, searchOption);

  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState({ page: 0, size: 10 });

  // 수정
  const handleEditClick = () => {
    // console.log("handleEditClick !!! ", param);

    switch (category) {
      case "firmwareMng": {
        history.push({
          pathname: "/fota/firmwareManagementDetail",
          state: { data: param, isEdit: true },
        });
        break;
      }
      case "fotaPolicyMng": {
        history.push({
          pathname: "/fota/policyManagementDetail",
          state: { data: param, isEdit: true },
        });
        break;
      }
      case "certPolicyMng": {
        history.push({
          pathname: "/fota/certPolicyManagementDetail",
          state: { data: param, isEdit: true },
        });
        break;
      }
      default:
        break;
    }
  };
  // 삭제
  const handleDeleteClick = async () => {
    console.log("handleDeleteClick !!! ", param);
    let result = null;
    switch (category) {
      case "firmwareMng": {
        result = await dispatch(deleteFirmware({ frmwrId: param.frmwrId }));
        if (!isNull(result)) {
          dispatch(
            getFirmwareList({
              param: makeQuery(page, searchOption),
            })
          );
        }
        break;
      }
      case "fotaPolicyMng": {
        result = await dispatch(deleteFotaPolicy({ policyId: param.policyId }));
        if (!isNull(result)) {
          dispatch(
            getFotaPolicyList({
              param: makeQuery(page, searchOption),
            })
          );
        }
        break;
      }
      case "certPolicyMng": {
        result = await dispatch(deleteCertPolicy({ policyId: param.policyId }));
        console.log("result >> ", JSON.stringify(result));
        if (!isNull(result)) {
          dispatch(
            getCertPolicyList({
              param: makeQuery(page, searchOption),
            })
          );
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ cursor: "pointer" }}
    >
      {category === "fotaStatus" ? (
        <Button
          title="Edit"
          aria-label="Edit"
          size="large"
          onClick={handleEditClick}
          style={{ minWidth: "35px" }}
          sx={{ color: "#2196f3" }}
        >
          <HistoryIcon fontSize="small" style={{ color: "#2196f3" }} />
        </Button>
      ) : (
        <Button
          title="Edit"
          aria-label="Edit"
          size="large"
          onClick={handleEditClick}
          style={{ minWidth: "35px" }}
          sx={{ color: "#2196f3" }}
        >
          <EditIcon fontSize="small" style={{ color: "#2196f3" }} />
        </Button>
      )}
      <Button
        title="Clear"
        aria-label="Clear"
        size="large"
        onClick={handleDeleteClick}
        style={{ minWidth: "35px" }}
        sx={{ color: "#2196f3" }}
      >
        <DeleteIcon fontSize="small" style={{ color: "#8a93a2" }} />
      </Button>
    </div>
  );
};

export default MatEdit;
