import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import ComCodeDialog from './CustomDialogs/ComCodeDialog';
import ComCodeMgmtTree from './ComCodeMgmtTree';
import ComCodeMgmtGrid from './ComCodeMgmtGrid';
import {
  getComCodeGroup,
  setComCodeParams,
} from 'redux/reducers/adminMgmt/comCodeMgmt';

const ComCodeMgmt = () => {
  const dispatch = useDispatch();
  const [openComCodeDialog, setOpenComCodeDialog] = useState(false);
  const [comCodeDialogInfo, setComCodeDialogInfo] = useState({
    type: '',
    params: {},
  });

  const handleComCodeDialogOpen = (values) => {
    setComCodeDialogInfo({ ...comCodeDialogInfo, ...values });
    setOpenComCodeDialog(true);
  };

  const handleComCodeDialogClose = async (isSubmit, submitType) => {
    setOpenComCodeDialog(false);

    if (isSubmit) {
      submitType === 'group'
        ? await dispatch(getComCodeGroup())
        : dispatch(setComCodeParams({ comCodeDialogInfo }));
    }
  };

  return (
    <Grid
      container
      direction="row"
      rowSpacing={1}
      columnSpacing={1}
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <Grid item xs={4}>
        <ComCodeMgmtTree onComCodeDialogOpen={handleComCodeDialogOpen} />
      </Grid>
      <Grid item xs={8}>
        <ComCodeMgmtGrid onComCodeDialogOpen={handleComCodeDialogOpen} />
      </Grid>
      <ComCodeDialog
        open={openComCodeDialog}
        info={comCodeDialogInfo}
        onClose={handleComCodeDialogClose}
      ></ComCodeDialog>
    </Grid>
  );
};

export default ComCodeMgmt;
