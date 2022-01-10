import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteCertPolicy,
  deleteFirmware,
  deleteFotaPolicy,
  deleteStatus,
  getCertPolicyList,
  getFirmwareList,
  getFotaPolicyList,
  getStatusList,
} from "../../redux/reducers/fotaInfoSlice";
import { isNull, makeQuery } from "../../common/utils/CowayUtils";
import { Button } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const MatEdit = (props) => {
  // console.log("category >> ", category, param, searchOption);

  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState({ page: 0, size: 10 });
  const { category, param, searchOption, pages } = props;

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
    let result = null;
    switch (category) {
      case "firmwareMng": {
        result = await dispatch(deleteFirmware({ frmwrId: param.frmwrId }));
        if (!isNull(result)) {
          dispatch(
            getFirmwareList({
              param: makeQuery(pages, searchOption),
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
              param: makeQuery(pages, searchOption),
            })
          );
        }
        break;
      }
      case "certPolicyMng": {
        result = await dispatch(deleteCertPolicy({ policyId: param.policyId }));
        if (!isNull(result)) {
          dispatch(
            getCertPolicyList({
              param: makeQuery(pages, searchOption),
            })
          );
        }
        break;
      }
      case "fotaStatus": {
        result = await dispatch(deleteStatus({ serial: param.serial }));
        if (!isNull(result)) {
          dispatch(
            getStatusList({
              param: makeQuery(pages, searchOption),
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
    <>
      {category !== "fotaStatus" ? (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
        >
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
      ) : (
        <>
          <Button
            title="History"
            aria-label="History"
            size="small"
            onClick={() => props.handleDetailClick("history", param)}
            style={{ minWidth: "0px" }}
          >
            <HistoryIcon fontSize="small" style={{ color: "#2196f3" }} />
          </Button>
          <Button
            title="Status clear"
            aria-label="Status clear"
            size="small"
            onClick={handleDeleteClick}
            style={{ minWidth: "0px" }}
          >
            <RestartAltIcon fontSize="small" style={{ color: "#8a93a2" }} />
          </Button>
          <Button
            title="More Info"
            aria-label="More Info"
            size="small"
            onClick={() => props.handleDetailClick("info", param)}
            style={{ minWidth: "35px" }}
            sx={{ color: "#2196f3" }}
          >
            <InfoIcon fontSize="small" style={{ color: "#1976d2" }} />
          </Button>
        </>
      )}
    </>
  );
};

export default MatEdit;
