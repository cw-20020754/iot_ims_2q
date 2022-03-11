import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CDialogContent from 'components/basic/CDialogContent';
import CDialogActions from 'components/basic/CDialogActions';
import CButton from 'components/basic/CButton';
import CInput from 'components/basic/CInput';

const ComCodeDialog = (props) => {
  const { open, onClose, info } = props;
  const { t } = useTranslation();

  const title = () => {
    switch (info.type) {
      case 'addGroup':
        return t('word.group') + ' ' + t('word.add');
      case 'mdfGroup':
        return t('word.group') + ' ' + t('word.mdf');
      case 'addCode':
        return t('word.code') + ' ' + t('word.add');
      case 'mdfCode':
        return t('word.code') + ' ' + t('word.mdf');
      default:
        return t('desc.delWaring');
    }
  };

  return (
    <CDialog open={open} onClose={() => onClose()}>
      <CDialogTitle
        prependIcon={info.type.includes('del') && WarningIcon}
        title={title()}
      ></CDialogTitle>

      <CDialogContent grids={[12]}>
        <CInput label="test1" sx={{ width: 1 }}></CInput>
      </CDialogContent>

      <CDialogActions>
        <CButton onClick={() => onClose()}>{t('word.cancel')}</CButton>
        <CButton onClick={() => onClose()}>{t('word.save')}</CButton>
      </CDialogActions>
    </CDialog>
  );
};

export default ComCodeDialog;
