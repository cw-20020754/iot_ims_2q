import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Grid } from '@mui/material';
import ComCodeDialog from './CustomDialogs/ComCodeDialog';
import ComCodeMgmtTree from './ComCodeMgmtTree';
import ComCodeMgmtGrid from './ComCodeMgmtGrid';
import {
  getComCodeGroup,
  setComCodeDialogInfo,
  setComCodeOpenDialog,
  getComCode,
  setComCodeParams,
} from 'redux/reducers/adminMgmt/comCodeMgmt';

const ComCodeMgmt = () => {
  const dispatch = useDispatch();

  const dialogInfo = useSelector(
    (state) => state.comCodeMgmt.dialogInfo,
    shallowEqual,
  );

  const initComCodeParams = useSelector(
    (state) => state.comCodeMgmt.initComCodeParams,
    shallowEqual,
  );

  const comCodeParams = useSelector(
    (state) => state.comCodeMgmt.comCodeParams,
    shallowEqual,
  );

  const handleDialogOpen = async (values) => {
    await dispatch(setComCodeDialogInfo({ ...dialogInfo, ...values }));
    await dispatch(setComCodeOpenDialog(true));
  };

  const handleDialogClose = async (isSubmit, submitType) => {
    if (isSubmit) {
      if (submitType === 'group') {
        await dispatch(getComCodeGroup());
      } else {
        await dispatch(getComCode(comCodeParams));
        await dispatch(getComCodeGroup());
      }
    }
  };

  const dispatchComCodeParams = async () => {
    await dispatch(setComCodeParams({ ...initComCodeParams }));
  };

  useEffect(() => {
    return () => dispatchComCodeParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
