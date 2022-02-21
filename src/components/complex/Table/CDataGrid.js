import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';
import CToolbar from './CToolbar';
import CNoRowsOverlay from './CNoRowsOverlay';
import CLoadingOverlay from './CLoadingOverlay';

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
  } = props;

  // console.log('rows >> ', rows);

  const [pages, setPages] = useState(param.page);
  const [pageSize, setPageSize] = useState(param.size);

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
            Toolbar: CToolbar,
            NoRowsOverlay: CNoRowsOverlay,
            LoadingOverlay: CLoadingOverlay,
          }}
          componentsProps={{ toolbar: { toolbarBtnList: toolbarBtnList } }}
          onCellClick={(param) => {
            if (category === 'statusSearch' && param.field !== 'editDelete') {
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

export default CDataGrid;
