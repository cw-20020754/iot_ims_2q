import React, { useCallback, useEffect } from 'react';
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
  postComCodeList,
  postComCodeGroup,
  putComCodeGroup,
  deleteComCodeGroup,
  postComCode,
  putComCode,
  deleteComCode,
} from 'redux/reducers/adminMgmt/comCodeMgmt';
import { setSnackbar } from 'redux/reducers/changeStateSlice';

let hasError = false;

const ComCodeDialog = (props) => {
  const { open, onClose, info } = props;
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

  const langCodeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComComList.filter(
        (code) => code?.groupId === '012',
      ),
    shallowEqual,
  )[0]?.codeList;

  const renderForm = () => {
    switch (info.type) {
      case 'addGroup':
        return (
          <>
            <CDialogContent grids={[12]}>
              <CInput
                name="groupNm"
                placeholder={texts.addGroupNm}
                label={texts.groupNm}
                sx={{ width: 1 }}
                value={info.params.groupNm}
                onChange={(e) => (info.params.groupNm = e.target.value)}
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
                defaultValue={info.params.groupNm}
                onChange={(e) => (info.params.groupNm = e.target.value)}
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
              <CInput
                name="groupNm"
                label={texts.groupNm}
                sx={{ width: 1 }}
                defaultValue={info.params.groupNm}
                InputProps={{
                  readOnly: true,
                }}
              ></CInput>
              <CInput
                name="code"
                placeholder={texts.addCode}
                label={texts.code}
                sx={{ width: 1 }}
                value={info.params.code}
                onChange={(e) => (info.params.code = e.target.value)}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 5)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
              <CInput
                name="codeNm"
                placeholder={texts.addCodeNm}
                label={texts.codeNm}
                sx={{ width: 1 }}
                value={info.params.codeNm}
                onChange={(e) => (info.params.codeNm = e.target.value)}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 50)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
              <CSelect
                label={texts.langCode}
                sx={{ width: 1 }}
                value={info.params.langCode || 'ko'}
                onChange={(e) => (info.params.langCode = e.target.value)}
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
                defaultValue={info.params.codeNm}
                onChange={(e) => (info.params.codeNm = e.target.value)}
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

  const handleValidation = (e) => {
    switch (info.type) {
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

    if (hasError) {
      hasError = false;
      return;
    }

    switch (info.type) {
      case 'addGroup':
        await dispatch(postComCodeGroup(info.params));
        break;
      case 'mdfGroup':
        await dispatch(putComCodeGroup(info.params));
        break;
      case 'delGroup':
        await dispatch(deleteComCodeGroup(info.params.groupId));
        break;
      case 'addCode':
        isComCodeDuplicated = await (
          await comCodeAPI.getComCodeDuplicateCheck(info.params)
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
          await dispatch(postComCode(info.params));
        }
        break;
      case 'mdfCode':
        await dispatch(putComCode(info.params));
        break;
      case 'delCode':
        await dispatch(deleteComCode(info.params));
        break;
      default:
    }

    if (!isComCodeDuplicated) {
      const submitType = info.type.includes('Group') ? 'group' : 'code';
      return handleClose(true, submitType);
    }
  };

  const handleClose = (isSubmit, submitType) => {
    hasError = false;
    info.params = {};
    return onClose(isSubmit, submitType);
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: ['012'] }));
  }, [dispatch]);

  useEffect(() => {
    !langCodeList && fetchComCodeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CDialog
      id="comCodeForm"
      open={open || false}
      onClose={handleClose}
      component="form"
      onSubmit={async (e) => await handleSubmit(e)}
    >
      <CDialogTitle
        prependIcon={info.type.includes('del') && WarningIcon}
        title={texts[info.type]}
      ></CDialogTitle>
      <FormControl component="fieldset">
        {renderForm(info.type)}
        <CDialogActions>
          <CButton type="button" onClick={() => handleClose()}>
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
