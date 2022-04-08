import React from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGridPro,
  useGridApiRef,
  GridLinkOperator,
} from '@mui/x-data-grid-pro';
import { Card, Box, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CButton from 'components/basic/CButton';
import CToolbar from './CToolbar';
import CNoRowsOverlay from './CNoRowsOverlay';
import CLoadingOverlay from './CLoadingOverlay';

/**
 * Grid Filter Operator`s
 * - getGridStringOperators
 * - getGridDateOperators
 * - getGridNumericOperators
 */

/*
 * <사용 가이드>
 * Columns
 * - type : default 'string'으로 왼쪽 정렬을 쓰고,
 * - 오른쪽 정렬이 필요한 숫자는 'number'
 * - 버튼 등은 'actions'
 * - 중간 정렬인 경우는 type 대신 align: 'center'
 */

const CDataGrid = (props) => {
  const { t } = useTranslation();

  const {
    title,
    titleButtons,
    columns,
    rows,
    totalElement,
    isLoading,
    pagination,
    paginationMode,
    page,
    pageSize,
    rowsPerPage,
    initialState,
    filterMode,
    onFilterChange,
    onColumnVisibilityModelChange,
    height,
    autoHeight,
    columnsButton,
    exportButton,
    onExportButtonClick,
    ...rest
  } = props;

  const apiRef = useGridApiRef();

  const toolBarRender = () => (
    <CToolbar
      columnsButton={columnsButton}
      exportButton={exportButton}
      exportText={t('word.export')}
      onExportButtonClick={onExportButtonClick}
    />
  );

  return (
    <Card sx={{ width: 1 }}>
      <CardContent sx={{ pt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
          }}
        >
          {title && (
            <Typography variant={'h4'} sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          )}
          {titleButtons && titleButtons.length > 0
            ? titleButtons.map((item) => (
                <CButton
                  key={item.id}
                  color={item.color}
                  disabled={item.disabled}
                  onClick={() => item.onTitleButtonClick(item.id)}
                >
                  {item.text}
                </CButton>
              ))
            : null}
        </Box>
        <Box
          style={{
            display: 'flex',
            height: height ? height : 500,
            overflow: 'auto',
          }}
        >
          <DataGridPro
            sx={{
              p: 0.5,
              '& .MuiDataGrid-columnHeadersInner': {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            }}
            apiRef={apiRef}
            {...rest}
            columns={columns}
            rows={rows}
            autoHeight={autoHeight}
            loading={isLoading}
            rowCount={totalElement}
            pagination={pagination}
            columnBuffer={2}
            columnThreshold={2}
            filterMode={filterMode}
            paginationMode={paginationMode}
            onFilterModelChange={onFilterChange}
            disableColumnMenu={true}
            components={{
              Toolbar: toolBarRender,
              LoadingOverlay: CLoadingOverlay,
              NoRowsOverlay: CNoRowsOverlay,
            }}
            localeText={{
              toolbarColumns: t('word.display') + t('word.item'),
            }}
            initialState={initialState}
            onColumnVisibilityModelChange={onColumnVisibilityModelChange}
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPage}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CDataGrid;
