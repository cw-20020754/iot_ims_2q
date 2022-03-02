import React from 'react';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { Card, CardContent, Typography } from '@mui/material';
import CToolbar from './CToolbar';
import CNoRowsOverlay from './CNoRowsOverlay';
import CLoadingOverlay from './CLoadingOverlay';
import { useNavigate } from 'react-router-dom';
import { getFirmwareList } from '../../../redux/reducers/fotaInfoSlice';
const CDataGrid = (props) => {
  const {
    title,
    columns,
    rows,
    totalElement,
    searchOption,
    category,
    isLoading,
    param,
    toolbarBtnList,
    ...rest
  } = props;

  const apiRef = useGridApiRef();

  return (
    <Card
      sx={{
        marginTop: 1,
        width: '100%',
      }}
    >
      <CardContent sx={{ height: totalElement > 0 ? 'auto' : '400px' }}>
        <Typography variant={'h4'} sx={{ padding: '10px' }}>
          {title}
        </Typography>
        <DataGridPro
          apiRef={apiRef}
          {...rest}
          columns={columns}
          rows={rows}
          autoHeight={totalElement > 0}
          loading={isLoading}
          rowCount={totalElement}
          pagination
          columnBuffer={2}
          columnThreshold={2}
          paginationMode="server"
          components={{
            Toolbar: CToolbar,
            LoadingOverlay: CLoadingOverlay,
            NoRowsOverlay: CNoRowsOverlay,
          }}
          componentsProps={{
            toolbar: {
              toolbarBtnList: toolbarBtnList,
            },
          }}
          pageSize={param.size}
          rowsPerPageOptions={param.rowPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default CDataGrid;
