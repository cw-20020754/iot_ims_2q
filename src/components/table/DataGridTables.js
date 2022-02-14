import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import CustomToolbar from "./CustormToolbar";
import { isNull } from "../../common/utils";
import fotaStyles from "../../pages/Fota/FotaStyle";

const DataGridTables = (props) => {
  const {
    columns,
    rows,
    totalElement,
    searchOption,
    category,
    isLoading,
    param,
  } = props;

  const [pages, setPages] = useState(param.page);
  const [pageSize, setPageSize] = useState(param.size);

  useEffect(() => {
    // console.log("option >>> ", option);
  }, []);

  return (
    <Card
      sx={{
        marginTop: 1,
        width: "100%",
      }}
    >
      <CardContent sx={{ height: totalElement > 0 ? "auto" : "400px" }}>
        <DataGrid
          rows={rows}
          columns={columns.map((item) => {
            return {
              ...item,
              sortable: false,
            };
          })}
          autoHeight={totalElement > 0}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: CustomLoadingOverlay,
          }}
          onCellClick={(param) => {
            if (category === "statusSearch" && param.field !== "editDelete") {
              props.rowDetail(param.row);
            }
          }}
          onPageSizeChange={(newPageSize) => {
            props.onFetchData({
              page: pages,
              size: newPageSize,
            });

            setPageSize(newPageSize);
          }}
          onPageChange={(newPages) => {
            props.onFetchData({
              page: newPages,
              size: pageSize,
            });

            setPages(newPages);
          }}
          pageSize={pageSize}
          rowCount={totalElement}
          paginationMode="server"
          disableColumnMenu={true}
          loading={isLoading}
          pagination
          rowsPerPageOptions={param.rowPerPage}
          columnBuffer={2}
          columnThreshold={2}
        />
      </CardContent>
    </Card>
  );
};

export default DataGridTables;
