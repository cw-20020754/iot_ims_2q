import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CDialogContent from 'components/basic/CDialogContent';
import CDialogActions from 'components/basic/CDialogActions';
import CButton from 'components/basic/CButton';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';

const ComCodeDialog = (props) => {
  const { open, onClose, info } = props;
  const { t } = useTranslation();

  const texts = {
    addGroup: t('word.group') + ' ' + t('word.add'),
    mdfGroup: t('word.group') + ' ' + t('word.mdf'),
    delGroup: t('desc.delWarning'),
    addCode: t('word.code') + ' ' + t('word.add'),
    mdfCode: t('word.code') + ' ' + t('word.mdf'),
    delCode: t('desc.delWarning'),
    groupNm: t('word.group') + ' ' + t('word.nm'),
    addGroupNm: t('word.add') + ' ' + t('word.group') + ' ' + t('word.nm'),
    mdfGroupNm: t('word.mdf') + ' ' + t('word.group') + ' ' + t('word.nm'),
    code: t('word.code'),
    codeNm: t('word.code') + ' ' + t('word.nm'),
    langCode: t('word.lang') + ' ' + t('word.code'),
    addCodeNm: t('word.add') + ' ' + t('word.code') + ' ' + t('word.nm'),
    mdfCodeNm: t('word.mdf') + ' ' + t('word.code') + ' ' + t('word.nm'),
  };

  const renderForm = (type) => {
    switch (type) {
      case 'addGroup':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                placeholder={texts.addGroupNm}
                label={texts.groupNm}
                sx={{ width: 1 }}
              ></CInput>
            </CDialogContent>
          </>
        );
      case 'mdfGroup':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                placeholder={texts.mdfGroupNm}
                label={texts.groupNm}
                sx={{ width: 1 }}
              ></CInput>
            </CDialogContent>
          </>
        );

      case 'addCode':
        return (
          <>
            <CDialogContent grids={[12, 12, 12]}>
              <CInput
                placeholder={texts.addCode}
                label={texts.code}
                sx={{ width: 1 }}
              ></CInput>
              <CInput
                placeholder={texts.addCodeNm}
                label={texts.codeNm}
                sx={{ width: 1 }}
              ></CInput>
              <CSelect label={texts.langCode} sx={{ width: 1 }}></CSelect>
            </CDialogContent>
          </>
        );
      case 'mdfCode':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                placeholder={texts.addCodeNm}
                label={texts.codeNm}
                sx={{ width: 1 }}
              ></CInput>
            </CDialogContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <CDialog open={open} onClose={() => onClose()}>
      <CDialogTitle
        prependIcon={info.type.includes('del') && WarningIcon}
        title={texts[info.type]}
      ></CDialogTitle>

      {renderForm(info.type)}

      <CDialogActions>
        <CButton onClick={() => onClose()}>{t('word.cancel')}</CButton>
        <CButton onClick={() => onClose()}>{t('word.save')}</CButton>
      </CDialogActions>
    </CDialog>
  );
};

export default ComCodeDialog;
