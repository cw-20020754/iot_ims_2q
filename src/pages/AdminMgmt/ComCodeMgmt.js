import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid } from '@mui/material';
import ComCodeDialog from './CustomDialogs/ComCodeDialog';
import ComCodeMgmtTree from './ComCodeMgmtTree';
import ComCodeMgmtGrid from './ComCodeMgmtGrid';
import {
  getComCodeGroup,
  setComCodeParams,
  setComCodeDialogInfo,
  setComCodeOpenDialog,
} from 'redux/reducers/adminMgmt/comCodeMgmt';

const ComCodeMgmt = () => {
  const dispatch = useDispatch();

  const dialogInfo = useSelector(
    (state) => state.comCodeMgmt.dialogInfo,
    shallowEqual,
  );

  const handleDialogOpen = async (values) => {
    await dispatch(setComCodeDialogInfo({ ...dialogInfo, ...values }));
    await dispatch(setComCodeOpenDialog(true));
  };

  const handleDialogClose = async (isSubmit, submitType) => {
    if (isSubmit) {
      submitType === 'group'
        ? await dispatch(getComCodeGroup())
        : dispatch(setComCodeParams({ dialogInfo }));
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        rowSpacing={1}
        columnSpacing={1}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={4}>
          <ComCodeMgmtTree onComCodeDialogOpen={handleDialogOpen} />
        </Grid>
        <Grid item xs={8}>
          <ComCodeMgmtGrid onComCodeDialogOpen={handleDialogOpen} />
        </Grid>
      </Grid>
      <ComCodeDialog onClose={handleDialogClose}></ComCodeDialog>
    </>
  );
};

export default ComCodeMgmt;
