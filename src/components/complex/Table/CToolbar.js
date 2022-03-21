import React from 'react';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getDatagridInfo } from 'redux/reducers/changeStateSlice';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid-pro';
import InfoIcon from '@mui/icons-material/Info';

const CToolbar = (props) => {
  const { toolbarBtnList } = props;
  const dispatch = useDispatch();

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1}>
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
};

export default CToolbar;
