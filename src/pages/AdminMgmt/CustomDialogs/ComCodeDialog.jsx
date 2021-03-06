import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CDialogContent from 'components/basic/CDialogContent';
import CDialogActions from 'components/basic/CDialogActions';
import CButton from 'components/basic/CButton';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';
import rules from 'common/rules';
import { comCodeAPI } from 'api';
import {
  postComCodeGroup,
  putComCodeGroup,
  deleteComCodeGroup,
  postComCode,
  putComCode,
  deleteComCode,
  setComCodeDialogInfo,
  setComCodeOpenDialog,
} from '@/redux/reducers/adminMgmt/comCodeMgmt';
import { setSnackbar } from '@/redux/reducers/common/sharedInfo';

let hasError = false;

const ComCodeDialog = (props) => {
  const { onClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const openDialog = useSelector(
    (state) => state.comCodeMgmt.openDialog,
    shallowEqual,
  );

  const dialogInfo = useSelector(
    (state) => state.comCodeMgmt.dialogInfo,
    shallowEqual,
  );

  const langCodeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '012',
      )[0]?.codeList,
    shallowEqual,
  );

  const renderForm = () => {
    switch (dialogInfo.type) {
      case 'addGroup':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                name="groupNm"
                placeholder={texts.addGroupNm}
                label={texts.groupNm}
                sx={{ width: 1 }}
                value={dialogInfo.params.groupNm}
                onChange={(e) => handleChange({ groupNm: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 50)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
            </CDialogContent>
          </>
        );
      case 'mdfGroup':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                name="groupNm"
                placeholder={texts.mdfGroupNm}
                label={texts.groupNm}
                sx={{ width: 1 }}
                defaultValue={dialogInfo.params.groupNm}
                onChange={(e) => handleChange({ groupNm: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 50)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
            </CDialogContent>
          </>
        );

      case 'addCode':
        return (
          <>
            <CDialogContent grids={[12, 12, 12, 12]}>
              {dialogInfo.params.groupNm && (
                <CInput
                  name="groupNm"
                  label={texts.groupNm}
                  sx={{ width: 1 }}
                  defaultValue={dialogInfo.params.groupNm}
                  InputProps={{
                    readOnly: true,
                  }}
                ></CInput>
              )}
              <CInput
                name="code"
                placeholder={texts.addCode}
                label={texts.code}
                sx={{ width: 1 }}
                value={dialogInfo.params.code}
                onChange={(e) => handleChange({ code: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 4)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
              <CInput
                name="codeNm"
                placeholder={texts.addCodeNm}
                label={texts.codeNm}
                sx={{ width: 1 }}
                value={dialogInfo.params.codeNm}
                onChange={(e) => handleChange({ codeNm: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 50)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
              <CSelect
                label={texts.langCode}
                sx={{ width: 1 }}
                value={dialogInfo.params.langCode}
                onChange={(e) => handleChange({ langCode: e.target.value })}
                optionArray={langCodeList}
              ></CSelect>
            </CDialogContent>
          </>
        );
      case 'mdfCode':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                name="codeNm"
                placeholder={texts.addCodeNm}
                label={texts.codeNm}
                sx={{ width: 1 }}
                defaultValue={dialogInfo.params.codeNm}
                onChange={(e) => handleChange({ codeNm: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 50)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
            </CDialogContent>
          </>
        );
      default:
    }
  };

  const handleChange = async (values) => {
    await dispatch(
      setComCodeDialogInfo({ params: { ...dialogInfo.params, ...values } }),
    );
  };

  const handleValidation = (e) => {
    switch (dialogInfo.type) {
      case 'addGroup':
      case 'mdfGroup':
        e.target.form.groupNm.focus();
        e.target.form.groupNm.blur();
        break;
      case 'addCode':
        e.target.form.code.focus();
        e.target.form.code.blur();
        e.target.form.codeNm.focus();
        e.target.form.codeNm.blur();
        break;
      case 'mdfCode':
        e.target.form.codeNm.focus();
        e.target.form.codeNm.blur();
        break;
      default:
    }
  };

  const handleFormChildrenError = () => {
    hasError = true;
  };

  const handleSubmit = async (e) => {
    let isComCodeDuplicated = false;
    e.preventDefault();

    if (hasError === true) {
      hasError = false;
      return;
    }

    switch (dialogInfo.type) {
      case 'addGroup':
        await dispatch(postComCodeGroup(dialogInfo.params));
        break;
      case 'mdfGroup':
        await dispatch(putComCodeGroup(dialogInfo.params));
        break;
      case 'delGroup':
        await dispatch(deleteComCodeGroup(dialogInfo.params.groupId));
        break;
      case 'addCode':
        isComCodeDuplicated = await (
          await comCodeAPI.getComCodeDuplicateCheck(dialogInfo.params)
        )?.data?.content;
        if (isComCodeDuplicated) {
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarMessage: t('desc.alert.dataDuplicated'),
              autoHideDuration: 5000,
            }),
          );
        } else {
          await dispatch(postComCode(dialogInfo.params));
        }
        break;
      case 'mdfCode':
        await dispatch(putComCode(dialogInfo.params));
        break;
      case 'delCode':
        await dispatch(deleteComCode(dialogInfo.params));
        break;
      default:
    }

    if (!isComCodeDuplicated) {
      const submitType = dialogInfo.type.includes('Group') ? 'group' : 'code';
      return handleClose(true, submitType);
    }
  };

  const handleClose = async (isSubmit, submitType) => {
    hasError = false;
    await dispatch(setComCodeDialogInfo({}));
    await dispatch(setComCodeOpenDialog(false));
    return onClose(isSubmit, submitType);
  };

  return (
    <CDialog
      id="comCodeForm"
      open={openDialog}
      onClose={handleClose}
      component="form"
      onSubmit={async (e) => await handleSubmit(e)}
    >
      <CDialogTitle
        prependIcon={dialogInfo.type.includes('del') && WarningIcon}
        title={texts[dialogInfo.type]}
      ></CDialogTitle>
      <FormControl component="fieldset">
        {renderForm(dialogInfo.type)}
        <CDialogActions>
          <CButton type="cancel" onClick={() => handleClose()}>
            {t('word.cancel')}
          </CButton>
          <CButton type="submit" onClick={(e) => handleValidation(e)}>
            {t('word.save')}
          </CButton>
        </CDialogActions>
      </FormControl>
    </CDialog>
  );
};

export default ComCodeDialog;
