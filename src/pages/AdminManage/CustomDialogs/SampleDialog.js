import React, { useCallback, useEffect, useState } from 'react';
import CDialog from '../../../components/basic/CDialog';
import CDialogTitle from '../../../components/basic/CDialogTitle';
import CDialogContent from '../../../components/basic/CDialogContent';
import CDialogActions from '../../../components/basic/CDialogActions';
import CButton from '../../../components/basic/CButton';
import CInput from '../../../components/basic/CInput';

const SampleDialog = (props) => {
  const { open, onClose } = props;

  return (
    <CDialog open={open} onClose={() => onClose()}>
      <CDialogTitle title="test">
        <CButton variant="outlined" text="test"></CButton>
      </CDialogTitle>
      <CDialogContent grids={[6, 6, 12]}>
        <CInput label="test1"></CInput>
        <CInput label="test2"></CInput>
        <CInput label="test3"></CInput>
      </CDialogContent>
      <CDialogActions>
        <CButton variant="outlined" text="취소"></CButton>
        <CButton variant="outlined" text="저장"></CButton>
      </CDialogActions>
    </CDialog>
  );
};

export default SampleDialog;
