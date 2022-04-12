import React from 'react';
import { Stack } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from '@mui/x-data-grid-pro';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CButton from 'components/basic/CButton';

const CToolbar = (props) => {
  const {
    columnsButton,
    exportButton,
    exportText,
    onExportButtonClick,
    rowCnt,
  } = props;

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1}>
        {columnsButton && <GridToolbarColumnsButton />}
        {exportButton && (
          <CButton
            variant="text"
            disabled={rowCnt > 0 ? false : true}
            startIcon={<FileDownloadIcon />}
            onClick={() => onExportButtonClick()}
          >
            {exportText}
          </CButton>
        )}
      </Stack>
    </GridToolbarContainer>
  );
};

export default CToolbar;
