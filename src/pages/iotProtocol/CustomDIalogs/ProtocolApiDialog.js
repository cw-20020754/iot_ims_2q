import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CDialogContent from 'components/basic/CDialogContent';
import CDialogActions from 'components/basic/CDialogActions';
import CButton from 'components/basic/CButton';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';
import CSlectAutocomplete from 'components/basic/CSlectAutocomplete';
import ComCodeDialog from 'pages/AdminMgmt/CustomDialogs/ComCodeDialog';
import rules from 'common/rules';
import {
  postComCodeList,
  setComCodeDialogInfo,
  setComCodeOpenDialog,
} from 'redux/reducers/adminMgmt/comCodeMgmt';
import {
  postProtocolApi,
  putProtocolApi,
  deleteProtocolApi,
  setDialogInfo,
  setOpenDialog,
} from 'redux/reducers/iotProtocol/protocolApi';
import { setSnackbar } from 'redux/reducers/common/sharedInfo';
import { protocolAPI } from 'api';

let hasError = false;

const ProtocolApiDialog = (props) => {
  const { onClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [comCodeSubmit, setComCodeSubmit] = useState(false);

  const openDialog = useSelector(
    (state) => state.protocolApi.openDialog,
    shallowEqual,
  );

  const dialogInfo = useSelector(
    (state) => state.protocolApi.dialogInfo,
    shallowEqual,
  );

  const texts = {
    addApi: t('word.api') + ' ' + t('word.add'),
    mdfApi: t('word.api') + ' ' + t('word.mdf'),
    delApi: t('desc.delWarning'),
    prodType: t('word.prod') + ' ' + t('word.type'),
    protocolType: t('word.protocol') + ' ' + t('word.type'),
    protocolGroup: t('word.protocol') + ' ' + t('word.group'),
    apiId: t('word.api') + ' ' + t('word.id'),
    apiNm: t('word.api') + ' ' + t('word.nm'),
    apiReqDirection: t('word.api') + ' ' + t('word.req') + t('word.direction'),
    apiDesc: t('word.api') + ' ' + t('word.desc'),
    protocolGroupAdd:
      t('word.protocol') + ' ' + t('word.group') + ' ' + t('word.add'),
    apiNmAdd: t('word.api') + ' ' + t('word.nm') + ' ' + t('word.add'),
  };

  const protocolTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '002',
      )[0]?.codeList,
    shallowEqual,
  );

  const prodTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '004',
      )[0]?.codeList,
    shallowEqual,
  );

  const protocolGroupList = useSelector((state) => {
    return state.comCodeMgmt.sharedComCodeList.filter(
      (code) => code?.groupId === '001',
    )[0]?.codeList;
  }, shallowEqual);

  const apiNmList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '003',
      )[0]?.codeList,
    shallowEqual,
  );

  const apiReqDirectionList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '010',
      )[0]?.codeList,
    shallowEqual,
  );

  const renderForm = () => {
    switch (dialogInfo.type) {
      case 'addApi':
      case 'mdfApi':
        return (
          <>
            <CDialogContent grids={[6, 6, 6, 6, 6, 6, 12]}>
              <CSelect
                name="prodType"
                label={texts.prodType}
                sx={{ width: 1 }}
                value={dialogInfo.params.prodTypeCode}
                optionArray={prodTypeList}
                inputProps={{
                  readOnly: true,
                }}
              ></CSelect>
              <CSelect
                name="protocolType"
                label={texts.protocolType}
                sx={{ width: 1 }}
                value={dialogInfo.params.typeCode}
                optionArray={protocolTypeList}
                inputProps={{
                  readOnly: true,
                }}
              ></CSelect>
              <CSelect
                name="protocolGroup"
                label={texts.protocolGroup}
                sx={{ width: 1 }}
                value={dialogInfo.params.groupCode}
                onChange={async (e) =>
                  await handleChange({ groupCode: e.target.value })
                }
                optionArray={protocolGroupList}
                onValidation={(value) => rules.requireAlert(value)}
                onValidationError={handleFormChildrenError}
              ></CSelect>
              <CInput
                name="apiId"
                placeholder={texts.apiId}
                label={texts.apiId}
                sx={{ width: 1 }}
                value={dialogInfo.params.apiId}
                onChange={(e) => handleChange({ apiId: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) ||
                  rules.maxLength(value, 5) ||
                  rules.minLength(value, 5)
                }
                onValidationError={handleFormChildrenError}
              ></CInput>
              <CSelect
                name="apiNm"
                label={texts.apiNm}
                sx={{ width: 1 }}
                value={dialogInfo.params.apiCode}
                onChange={(e) => handleChange({ apiCode: e.target.value })}
                optionArray={apiNmList}
                onValidation={(value) => rules.requireAlert(value)}
                onValidationError={handleFormChildrenError}
              ></CSelect>
              <CSelect
                name="apiReqDirection"
                label={texts.apiReqDirection}
                sx={{ width: 1 }}
                value={dialogInfo.params.apiDirectionCode}
                onChange={(e) =>
                  handleChange({ apiDirectionCode: e.target.value })
                }
                optionArray={apiReqDirectionList}
                onValidation={(value) => rules.requireAlert(value)}
                onValidationError={handleFormChildrenError}
              ></CSelect>
              <CInput
                name="apiDesc"
                placeholder={texts.apiDesc}
                label={texts.apiDesc}
                sx={{ width: 1 }}
                value={dialogInfo.params.apiDesc}
                multiline
                onChange={(e) => handleChange({ apiDesc: e.target.value })}
                onValidation={(value) =>
                  rules.requireAlert(value) || rules.maxLength(value, 255)
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
      setDialogInfo({ params: { ...dialogInfo.params, ...values } }),
    );
  };

  const handleValidation = (e) => {
    switch (dialogInfo.type) {
      case 'addApi':
      case 'mdfApi':
        e.target.form.protocolGroup.click();
        e.target.form.apiId.focus();
        e.target.form.apiId.blur();
        e.target.form.apiNm.click();
        e.target.form.apiReqDirection.click();
        e.target.form.apiDesc.focus();
        e.target.form.apiDesc.blur();
        break;
      default:
    }
  };

  const handleFormChildrenError = () => {
    hasError = true;
  };

  const handleSubmit = async (e) => {
    let isDuplicated = false;
    e.preventDefault();

    if (hasError === true) {
      hasError = false;
      return;
    }

    switch (dialogInfo.type) {
      case 'addApi':
        const duplicateCheckParams = {
          apiId: dialogInfo.params.apiId,
          prodTypeCode: dialogInfo.params.prodTypeCode,
          typeCode: dialogInfo.params.typeCode,
        };
        isDuplicated = (
          await protocolAPI.getProtocolApiDuplicateCheck(duplicateCheckParams)
        )?.data?.content;
        if (isDuplicated) {
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarMessage: t('desc.alert.dataDuplicated'),
              autoHideDuration: 5000,
            }),
          );
        } else {
          await dispatch(postProtocolApi(dialogInfo.params));
        }
        break;
      case 'mdfApi':
        await dispatch(putProtocolApi(dialogInfo.params));
        break;
      case 'delApi':
        await dispatch(deleteProtocolApi(dialogInfo.params.apiSeq.toString()));
        break;
      default:
    }

    if (!isDuplicated) {
      return handleClose(true);
    }
  };

  const handleClose = async (isSubmit) => {
    hasError = false;
    await dispatch(setDialogInfo({}));
    await dispatch(setOpenDialog(false));
    return onClose(isSubmit);
  };

  const handleComCodeDialogOpen = async (values) => {
    await dispatch(setComCodeDialogInfo({ ...dialogInfo, ...values }));
    await dispatch(setComCodeOpenDialog(true));
  };

  const handleComCodeDialogClose = async (isSubmit) => {
    if (isSubmit) {
      setComCodeSubmit(true);
    }
  };

  /**
   * 001 : 프로토콜 그룹
   * 003 : API 이름
   * 010 : API 요청방향
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(postComCodeList({ groupIdList: ['001', '003', '010'] }));
  }, [dispatch]);

  useEffect(() => {
    if (comCodeSubmit === true) {
      setComCodeSubmit(false);
      fetchComCodeList();
    }
  }, [
    fetchComCodeList,
    comCodeSubmit,
    protocolGroupList,
    apiNmList,
    apiReqDirectionList,
  ]);

  useEffect(() => {
    if (!protocolGroupList || !apiNmList || !apiReqDirectionList) {
      fetchComCodeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CDialog
        id="pprotocolApiForm"
        open={openDialog}
        maxWidth={!dialogInfo.type === 'delApi' && 'md'}
        component="form"
        onSubmit={async (e) => await handleSubmit(e)}
        onClose={handleClose}
      >
        <CDialogTitle
          prependIcon={dialogInfo.type === 'delApi' && WarningIcon}
          title={texts[dialogInfo.type]}
        >
          {dialogInfo.type !== 'delApi' && (
            <>
              <CButton
                type="button"
                onClick={() =>
                  handleComCodeDialogOpen({
                    type: 'addCode',
                    params: {
                      groupId: '001',
                      code: '',
                      codeNm: '',
                      langCode: 'ko',
                    },
                  })
                }
              >
                {texts.protocolGroupAdd}
              </CButton>
              <CButton
                type="button"
                onClick={() =>
                  handleComCodeDialogOpen({
                    type: 'addCode',
                    params: {
                      groupId: '003',
                      code: '',
                      codeNm: '',
                      langCode: 'ko',
                    },
                  })
                }
              >
                {texts.apiNmAdd}
              </CButton>
            </>
          )}
        </CDialogTitle>
        {renderForm(dialogInfo.type)}
        <CDialogActions>
          <CButton type="cancel" onClick={() => handleClose()}>
            {t('word.cancel')}
          </CButton>
          <CButton type="submit" onClick={(e) => handleValidation(e)}>
            {t('word.save')}
          </CButton>
        </CDialogActions>
      </CDialog>
      <ComCodeDialog
        onClose={(isSubmit) => handleComCodeDialogClose(isSubmit)}
      />
    </>
  );
};

export default ProtocolApiDialog;
