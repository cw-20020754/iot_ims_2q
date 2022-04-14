import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CButton from 'components/basic/CButton';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';
import CSlectAutocomplete from 'components/basic/CSlectAutocomplete';
import ComCodeDialog from 'pages/AdminMgmt/CustomDialogs/ComCodeDialog';
import ProtocolFuncDialog from './CustomDIalogs/ProtocolFuncDialog';
import rules from 'common/rules';
import {
  postComCodeList,
  setComCodeDialogInfo,
  setComCodeOpenDialog,
} from 'redux/reducers/adminMgmt/comCodeMgmt';
import {
  setOpenDialog,
  setDialogInfo,
  postProtocolItem,
  putProtocolItem,
  postProtocolValue,
  putProtocolValue,
  setProtocolItem,
  setProtocolValue,
} from 'redux/reducers/iotProtocol/protocolFunc';
import { setSnackbar } from 'redux/reducers/changeStateSlice';
import { protocolFuncAPI } from 'api';

let hasError = false;

const ProtocolFuncForm = (props) => {
  const { formType, onSubmit, onFormTypeChnage } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [deprecatedConfirm, setDeprecatedConfirm] = useState(false);
  const [comCodeSubmit, setComCodeSubmit] = useState(false);

  const texts = {
    funcNmAdd: t('word.func') + ' ' + t('word.nm') + ' ' + t('word.add'),
    funcAdd: t('word.func') + ' ' + t('word.add'),
    funcDel: t('word.func') + ' ' + t('word.del'),
    valueNmAdd: t('word.value') + ' ' + t('word.nm') + ' ' + t('word.add'),
    valueAdd: t('word.value') + ' ' + t('word.add'),
    valuecDel: t('word.value') + ' ' + t('word.del'),
    prodType: t('word.prod') + ' ' + t('word.type'),
    protocolType: t('word.protocol') + ' ' + t('word.type'),
    protocolGroup: t('word.protocol') + ' ' + t('word.group'),
    funcType: t('word.func') + ' ' + t('word.type'),
    funcId: t('word.func') + ' ' + t('word.id'),
    funcNm: t('word.func') + ' ' + t('word.nm'),
    len: t('word.len'),
    attribute: t('word.attribute'),
    deprecated: t('word.deprecated'),
    funcDesc: t('word.func') + ' ' + t('word.desc'),
    valueId: t('word.value') + ' ' + t('word.id'),
    valueNm: t('word.value') + ' ' + t('word.nm'),
    valueDesc: t('word.value') + ' ' + t('word.desc'),
    direction: t('word.direction'),
    add: t('word.add'),
    mdf: t('word.mdf'),
    func: t('word.func'),
    value: t('word.value'),
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

  const itemNmList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '005',
      )[0]?.codeList,
    shallowEqual,
  );

  const valueNmList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '006',
      )[0]?.codeList,
    shallowEqual,
  );

  const itemTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '009',
      )[0]?.codeList,
    shallowEqual,
  );

  const directionList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === '011',
      )[0]?.codeList,
    shallowEqual,
  );

  const protocolItem = useSelector(
    (state) => state.protocolFunc.protocolItem,
    shallowEqual,
  );

  const protocolValue = useSelector(
    (state) => state.protocolFunc.protocolValue,
    shallowEqual,
  );

  const comCodeDialogInfo = useSelector(
    (state) => state.comCodeMgmt.dialogInfo,
    shallowEqual,
  );

  const openDialog = useSelector(
    (state) => state.protocolFunc.openDialog,
    shallowEqual,
  );

  const dialogInfo = useSelector(
    (state) => state.protocolFunc.dialogInfo,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.protocolFunc.dataGridTitle,
    shallowEqual,
  );

  const hasValidationError = useSelector(
    (state) => state.protocolFunc.hasValidationError,
    shallowEqual,
  );

  const renderForm = () => {
    switch (formType) {
      case 'item':
        return (
          <>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={4}>
                <CSelect
                  name="prodType"
                  label={texts.prodType}
                  sx={{ width: 1 }}
                  value={protocolItem.prodTypeCode}
                  optionArray={prodTypeList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="protocolType"
                  label={texts.protocolType}
                  sx={{ width: 1 }}
                  value={protocolItem.typeCode}
                  optionArray={protocolTypeList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="protocolGroup"
                  label={texts.protocolGroup}
                  sx={{ width: 1 }}
                  value={protocolItem.groupCode}
                  optionArray={protocolGroupList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="funcType"
                  label={texts.funcType}
                  sx={{ width: 1 }}
                  value={protocolItem.itemTypeCode}
                  onChange={(e) =>
                    handleItemFormChange({ itemTypeCode: e.target.value })
                  }
                  optionArray={itemTypeList}
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CInput
                  name="funcId"
                  placeholder={texts.funcId}
                  label={texts.funcId}
                  sx={{ width: 1 }}
                  value={protocolItem.itemId}
                  onChange={(e) =>
                    handleItemFormChange({ itemId: e.target.value })
                  }
                  onValidation={(value) =>
                    rules.requireAlert(value) ||
                    rules.maxLength(value, 4) ||
                    rules.minLength(value, 4)
                  }
                  onValidationError={handleFormChildrenError}
                ></CInput>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="funcNm"
                  label={texts.funcNm}
                  sx={{ width: 1 }}
                  value={protocolItem.itemCode}
                  onChange={(e) =>
                    handleItemFormChange({ itemCode: e.target.value })
                  }
                  optionArray={itemNmList}
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CInput
                  name="len"
                  placeholder={texts.len}
                  label={texts.len}
                  sx={{ width: 1 }}
                  value={protocolItem.length}
                  type={'number'}
                  onChange={(e) =>
                    handleItemFormChange({ length: Number(e.target.value) })
                  }
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                ></CInput>
              </Grid>
              <Grid item xs={4}>
                <CInput
                  name="itemAttrNm"
                  placeholder={texts.attribute}
                  label={texts.attribute}
                  sx={{ width: 1 }}
                  value={protocolItem.itemAttrNm}
                  onChange={(e) =>
                    handleItemFormChange({ itemAttrNm: e.target.value })
                  }
                ></CInput>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={protocolItem.deprecatedYn === 'Y' ? true : false}
                      disabled
                    />
                  }
                  label={texts.deprecated}
                />
              </Grid>
              <Grid item xs={12}>
                <CInput
                  name="funcDesc"
                  placeholder={texts.funcDesc}
                  label={texts.funcDesc}
                  sx={{ width: 1 }}
                  value={protocolItem.itemDesc}
                  multiline
                  onChange={(e) =>
                    handleItemFormChange({ itemDesc: e.target.value })
                  }
                  onValidation={(value) =>
                    rules.requireAlert(value) || rules.maxLength(value, 255)
                  }
                  onValidationError={handleFormChildrenError}
                ></CInput>
              </Grid>
            </Grid>
          </>
        );
      case 'value':
        return (
          <>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={4}>
                <CSelect
                  name="prodType"
                  label={texts.prodType}
                  sx={{ width: 1 }}
                  value={protocolValue.prodTypeCode}
                  optionArray={prodTypeList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="protocolType"
                  label={texts.protocolType}
                  sx={{ width: 1 }}
                  value={protocolValue.typeCode}
                  optionArray={protocolTypeList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="protocolGroup"
                  label={texts.protocolGroup}
                  sx={{ width: 1 }}
                  value={protocolValue.groupCode}
                  optionArray={protocolGroupList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CInput
                  name="funcId"
                  placeholder={texts.funcId}
                  label={texts.funcId}
                  sx={{ width: 1 }}
                  value={protocolValue.itemId}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CInput>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="funcNm"
                  label={texts.funcNm}
                  sx={{ width: 1 }}
                  value={protocolValue.itemCode}
                  optionArray={itemNmList}
                  inputProps={{
                    readOnly: true,
                  }}
                ></CSelect>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <CInput
                  name="valueId"
                  placeholder={texts.valueId}
                  label={texts.valueId}
                  sx={{ width: 1 }}
                  value={protocolValue.valueId}
                  onChange={(e) =>
                    handleValueFormChange({ valueId: e.target.value })
                  }
                  onValidation={(value) =>
                    rules.requireAlert(value) || rules.maxLength(value, 10)
                  }
                  onValidationError={handleFormChildrenError}
                ></CInput>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="valueNm"
                  label={texts.valueNm}
                  sx={{ width: 1 }}
                  value={protocolValue.valueCode}
                  onChange={(e) =>
                    handleValueFormChange({ valueCode: e.target.value })
                  }
                  optionArray={valueNmList}
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                ></CSelect>
              </Grid>
              <Grid item xs={4}>
                <CSelect
                  name="direction"
                  label={texts.direction}
                  sx={{ width: 1 }}
                  value={protocolValue.valueDirectionCode}
                  onChange={(e) =>
                    handleValueFormChange({
                      valueDirectionCode: e.target.value,
                    })
                  }
                  optionArray={directionList}
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                ></CSelect>
              </Grid>
              <Grid item xs={12}>
                <CInput
                  name="valueDesc"
                  placeholder={texts.valueDesc}
                  label={texts.valueDesc}
                  sx={{ width: 1 }}
                  value={protocolValue.valueDesc}
                  multiline
                  onChange={(e) =>
                    handleValueFormChange({ valueDesc: e.target.value })
                  }
                  onValidation={(value) =>
                    rules.requireAlert(value) || rules.maxLength(value, 255)
                  }
                  onValidationError={handleFormChildrenError}
                ></CInput>
              </Grid>
            </Grid>
          </>
        );
      default:
    }
  };

  const handleItemFormChange = async (values) => {
    await dispatch(setProtocolItem({ ...protocolItem, ...values }));
  };

  const handleValueFormChange = async (values) => {
    await dispatch(setProtocolValue({ ...protocolValue, ...values }));
  };

  const handleValidation = (e) => {
    hasError = false;
    switch (formType) {
      case 'item':
        e.target.form.funcType.click();
        e.target.form.funcNm.click();
        e.target.form.funcId.focus();
        e.target.form.funcId.blur();
        e.target.form.len.focus();
        e.target.form.len.blur();
        e.target.form.itemAttrNm.focus();
        e.target.form.itemAttrNm.blur();
        e.target.form.funcDesc.focus();
        e.target.form.funcDesc.blur();
        break;
      case 'value':
        e.target.form.valueNm.click();
        e.target.form.direction.click();
        e.target.form.valueId.focus();
        e.target.form.valueId.blur();
        e.target.form.valueDesc.focus();
        e.target.form.valueDesc.blur();
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

    switch (formType) {
      case 'item':
        if (protocolItem.itemSeq === 0) {
          isDuplicated = (
            await protocolFuncAPI.getProtocolItemDuplicateCheck(protocolItem)
          )?.data?.content;

          if (isDuplicated) {
            handleDialogOpen({ type: 'deprecatedConfirm' });
          } else {
            await dispatch(postProtocolItem(protocolItem));
            return onSubmit();
          }
        } else {
          await dispatch(putProtocolItem(protocolItem));
          return onSubmit();
        }
        break;
      case 'value':
        if (protocolValue.valueSeq === 0) {
          isDuplicated = await (
            await protocolFuncAPI.getProtocolValueDuplicateCheck(protocolValue)
          )?.data?.content;

          if (isDuplicated) {
            dispatch(
              setSnackbar({
                snackbarOpen: true,
                snackbarMessage: t('desc.alert.dataDuplicated'),
                autoHideDuration: 5000,
              }),
            );
            return;
          } else {
            await dispatch(postProtocolValue(protocolValue));
          }
        } else {
          await dispatch(putProtocolValue(protocolValue));
        }
        return onSubmit();
      default:
    }
  };

  const handleDataAddClick = async () => {
    if (formType === 'item') {
      await dispatch(
        setProtocolItem({
          itemSeq: 0,
          itemTypeCode: '',
          itemId: '',
          itemCode: '',
          length: 0,
          itemAttrNm: '',
          itemDesc: '',
          deprecatedYn: 'N',
          cnt: 0,
        }),
      );
    } else {
      await dispatch(
        setProtocolValue({
          itemSeq: protocolItem.itemSeq,
          valueSeq: 0,
          itemId: protocolItem.itemId,
          itemCode: protocolItem.itemCode,
          valueId: '',
          valueCode: '',
          valueDirectionCode: '',
          valueDesc: '',
        }),
      );
    }
  };

  const handleCancel = async () => {
    hasError = false;
    await dispatch(setDialogInfo({}));
    await dispatch(setOpenDialog(false));
  };

  const handleDeprecatedConfirm = (isConfirm) => {
    setDeprecatedConfirm(isConfirm);
  };

  const handleComCodeDialogOpen = async (values) => {
    await dispatch(setComCodeDialogInfo({ ...comCodeDialogInfo, ...values }));
    await dispatch(setComCodeOpenDialog(true));
  };

  const handleFormTypeChnage = async (values) => {
    if (values === 'value') {
      await dispatch(
        setProtocolValue({
          itemSeq: protocolItem.itemSeq,
          itemId: protocolItem.itemId,
          itemCode: protocolItem.itemCode,
        }),
      );
    }
    return onFormTypeChnage(values);
  };

  const handleDialogOpen = async (values) => {
    if (values.type === 'delitem' && values.params.cnt > 0) {
      values.type = 'hasChildNoti';
    }
    await dispatch(setDialogInfo({ ...dialogInfo, ...values }));
    await dispatch(setOpenDialog(true));
  };

  /**
   * 005 : 기능 이름
   * 009 : 기능 유형
   * 006 : Value 이름
   * 011 : Value 방향
   */
  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: ['005', '006', '009', '011'],
      }),
    );
  }, [dispatch]);

  const featchPostProtocolItem = useCallback(async () => {
    await dispatch(postProtocolItem(protocolItem));
    await dispatch(setOpenDialog(false));
    return onSubmit();
  }, [dispatch, protocolItem, onSubmit]);

  useEffect(() => {
    if (deprecatedConfirm === true) {
      featchPostProtocolItem();
      setDeprecatedConfirm(false);
    }
  }, [featchPostProtocolItem, deprecatedConfirm]);

  useEffect(() => {
    if (comCodeSubmit === true) {
      setComCodeSubmit(false);
      fetchComCodeList();
    }
  }, [
    fetchComCodeList,
    comCodeSubmit,
    itemNmList,
    valueNmList,
    itemTypeList,
    directionList,
  ]);

  return (
    <>
      <Card
        component="form"
        onSubmit={async (e) => await handleSubmit(e)}
        sx={{ width: 1 }}
      >
        <CardHeader
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            py: 2,
            px: 2,
          }}
          title={dataGridTitle}
          action={
            <>
              <Chip
                label={texts.func}
                color="success"
                variant={formType === 'item' ? 'fill' : 'outlined'}
                sx={{ mr: 1, fontWeight: 600, fontSize: '12px' }}
                onClick={() => handleFormTypeChnage('item')}
              />
              {protocolItem.itemSeq > 0 && (
                <Chip
                  label={texts.value}
                  color="success"
                  variant={formType === 'value' ? 'fill' : 'outlined'}
                  sx={{ mr: 1, fontWeight: 600, fontSize: '12px' }}
                  onClick={() => handleFormTypeChnage('value')}
                />
              )}
              <Chip
                label={protocolItem.itemSeq === 0 ? texts.add : texts.mdf}
                color="info"
                sx={{ fontWeight: 600, fontSize: '12px' }}
              />
            </>
          }
        />
        <CardContent sx={{ pt: 0 }}>{renderForm()}</CardContent>
        <CardActions sx={{ p: 1 }}>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item xs>
              <CButton
                type="button"
                sx={{ mr: 1 }}
                onClick={() =>
                  handleComCodeDialogOpen({
                    type: 'addCode',
                    params: {
                      groupId: formType === 'item' ? '005' : '006',
                      code: '',
                      codeNm: '',
                      langCode: 'ko',
                    },
                  })
                }
              >
                {formType === 'item' ? texts.funcNmAdd : texts.valueNmAdd}
              </CButton>
              <CButton
                type="button"
                sx={{ mr: 1 }}
                onClick={handleDataAddClick}
              >
                {formType === 'item' ? texts.funcAdd : texts.valueAdd}
              </CButton>
              {protocolItem.itemSeq > 0 && (
                <CButton
                  type="button"
                  onClick={() =>
                    handleDialogOpen({
                      type: 'del' + formType,
                      params:
                        formType === 'item' ? protocolItem : protocolValue,
                    })
                  }
                >
                  {formType === 'item' ? texts.funcDel : texts.valuecDel}
                </CButton>
              )}
            </Grid>
            <Grid item xs="auto">
              <CButton
                type="cancel"
                sx={{ mr: 1 }}
                onClick={() => handleCancel()}
              >
                {t('word.cancel')}
              </CButton>
              <CButton type="submit" onClick={(e) => handleValidation(e)}>
                {t('word.save')}
              </CButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <ComCodeDialog />
      <ProtocolFuncDialog
        onClose={(isSubmit) => {
          if (isSubmit === true) {
            return onSubmit();
          }
        }}
        onConfirm={handleDeprecatedConfirm}
      />
    </>
  );
};

export default ProtocolFuncForm;
