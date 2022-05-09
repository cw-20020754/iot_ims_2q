import React from 'react';
import { Stack } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from '@mui/x-data-grid-pro';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import CButton from 'components/basic/CButton';
import { useTranslation } from 'react-i18next';

const CToolbar = (props) => {
  const { t } = useTranslation();
  const {
    columnsButton,
    exportButton,
    refreshButton,
    exportText,
    onExportButtonClick,
    onRefreshButtonClick,
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
        {refreshButton && (
          <CButton
            variant="text"
            color="success"
            startIcon={<RefreshIcon />}
            onClick={() => onRefreshButtonClick()}
          >
            {t('word.refresh')}
          </CButton>
        )}
      </Stack>
    </GridToolbarContainer>
  );
};

export default CToolbar;
