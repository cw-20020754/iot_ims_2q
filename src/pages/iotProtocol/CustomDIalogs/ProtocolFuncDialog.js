import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CDialogActions from 'components/basic/CDialogActions';
import CButton from 'components/basic/CButton';
import {
  setOpenDialog,
  setDialogInfo,
  deleteProtocolItem,
  deleteProtocolValue,
} from 'redux/reducers/iotProtocol/protocolFunc';

const ProtocolFuncDialog = (props) => {
  const { onClose, onConfirm } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openDialog = useSelector(
    (state) => state.protocolFunc.openDialog,
    shallowEqual,
  );

  const dialogInfo = useSelector(
    (state) => state.protocolFunc.dialogInfo,
    shallowEqual,
  );

  const texts = {
    delWarning: t('desc.delWarning'),
    deprecatedConfirm: t('desc.alert.deprecatedConfirm'),
    hasChildNoti: t('desc.protocolHasChildNoti'),
    confirm: t('word.confirm'),
    save: t('word.save'),
    cancel: t('word.cancel'),
  };

  const handleSubmit = async (e) => {
    switch (dialogInfo.type) {
      case 'deprecatedConfirm':
        return onConfirm(true);
      case 'hasChildNoti':
        return handleClose(false);
      case 'delitem':
        await dispatch(
          deleteProtocolItem(dialogInfo.params.itemSeq.toString()),
        );
        return handleClose(true);
      case 'delvalue':
        await dispatch(
          deleteProtocolValue({
            itemSeq: dialogInfo.params.itemSeq.toString(),
            valueSeq: dialogInfo.params.valueSeq.toString(),
          }),
        );
        return handleClose(true);
      default:
    }
  };

  const handleClose = async (isSubmit) => {
    await dispatch(setDialogInfo({}));
    await dispatch(setOpenDialog(false));
    return onClose(isSubmit);
  };

  return (
    <>
      <CDialog open={openDialog} onClose={handleClose}>
        <CDialogTitle
          prependIcon={WarningIcon}
          title={
            dialogInfo.type.includes('del')
              ? texts.delWarning
              : texts[dialogInfo.type]
          }
        />
        <CDialogActions>
          {dialogInfo.type !== 'hasChildNoti' && (
            <CButton type="cancel" onClick={() => handleClose()}>
              {texts.cancel}
            </CButton>
          )}
          <CButton type="button" onClick={handleSubmit}>
            {dialogInfo.type === 'hasChildNoti' ? texts.confirm : texts.save}
          </CButton>
        </CDialogActions>
      </CDialog>
    </>
  );
};

export default ProtocolFuncDialog;
