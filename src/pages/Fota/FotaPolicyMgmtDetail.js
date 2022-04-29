import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { dateToTimestampConvert, isNull } from 'common/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import fotaStyles from './FotaStyle';
import { useTranslation } from 'react-i18next';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';
import CButton from 'components/basic/CButton';
import dayjs from 'dayjs';
import { postComCodeList } from 'redux/reducers/adminMgmt/comCodeMgmt';
import { GROUP_ID } from 'common/constants';
import rules from 'common/rules';
import { GlobalLoading } from 'redux/reducers/common/sharedInfo';
import FotaPolicyMgmtDialog from './CustomDialogs/FotaPolicyMgmtDialog';
import {
  postFotaPolicy,
  putFotaPolicy,
  setDialogParams,
} from 'redux/reducers/fota/fotaPolicyMgmt';

const FotaPolicyMgmtDetail = () => {
  const dispatch = useDispatch();
  const classes = fotaStyles();
  const { t } = useTranslation();
  const ref = React.createRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    type: '',
    params: {},
    devModelCode: '',
  });

  let hasError = false;

  const { isEdit } = !isNull(location.state) ? location.state : false;
  const { params } = !isNull(location.state) ? location.state : {};
  const [submitData, setSubmitData] = useState({
    policyId: '',
    regId: 'i.Trust',
    useYn: true,
    wifiApplyType: 1,
    mcuApplyType: 1,
    regDate: null,
    updDate: null,
    wifiTargetFrmwrId: '',
    mcuTargetFrmwrId: '',
    publishDate: dayjs(new Date())
      .hour(0)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DDTHH:mm'),
  });

  // console.log('@@ params >> ', params);

  const texts = {
    fotaPolicyAdd: t('word.fota') + ' ' + t('word.policy') + t('word.add'),
    fotaPolicyMdf: t('word.fota') + ' ' + t('word.policy') + t('word.mdf'),
    policyNm: t('word.policy') + ' ' + t('word.nm'),
    policyDesc: t('word.policy') + ' ' + t('word.desc'),
    publishTargetType:
      t('word.publish') + ' ' + t('word.target') + ' ' + t('word.type'),
    targetId: t('word.serialNum'),
    publishType: t('word.publish') + ' ' + t('word.type'),
    reserveTime: t('word.reservation') + ' ' + t('word.time'),
    policyStatus: t('word.policy') + ' ' + t('word.status'),
    wifiFirmwareVer:
      t('word.wifi') + ' ' + t('word.firmware') + ' ' + t('word.ver'),
    mcuFirmwareVer:
      t('word.mcu') + ' ' + t('word.firmware') + ' ' + t('word.ver'),
    regCharId: t('word.reg') + t('word.char') + ' ' + t('word.id'),
    mdfCharId: t('word.mdf') + t('word.char') + ' ' + t('word.id'),
  };

  const policyStatusList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.POLICY_STATUS,
      ),
    shallowEqual,
  )[0]?.codeList;

  const publishTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.PUBLISH_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  const targetTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.TARGET_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  const handleFormChildrenError = () => {
    hasError = true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasError === true) {
      hasError = false;
      return;
    }

    dispatch(GlobalLoading(true));

    let result;

    const formData = {
      ...submitData,
      publishDate:
        Number(submitData.publishType) === 2 && !isNull(submitData.publishDate)
          ? dateToTimestampConvert(submitData.publishDate)
          : null,
      policyStatus: Number(submitData.policyStatus),
      targetType: Number(submitData.targetType),
      publishType: Number(submitData.publishType),
    };

    // 정책 등록
    if (!isEdit) {
      result = await dispatch(
        postFotaPolicy({
          formData: formData,
        }),
      );
    } else {
      result = await dispatch(
        putFotaPolicy({
          formData: submitData,
        }),
      );
    }

    if (
      !isNull(result) &&
      !isNull(result.payload) &&
      !isNull(result.payload.data.header.success)
    ) {
      navigate('/fota/fotaPolicyMgmt');
    }

    dispatch(GlobalLoading(false));
  };

  const handleValidation = (e) => {
    const {
      policyName,
      policyDesc,
      targetType,
      targetId,
      publishType,
      policyStatus,
      wifiFrmwrVer,
      mcuFrmwrVer,
    } = e.target.form;

    policyName.blur();
    policyName.focus();
    policyDesc.blur();
    policyDesc.focus();
    targetId.blur();
    targetId.focus();
    targetType.click();
    targetType.focus();
    publishType.click();
    publishType.focus();
    policyStatus.click();
    policyStatus.focus();
    wifiFrmwrVer.blur();
    wifiFrmwrVer.focus();
    mcuFrmwrVer.blur();
    mcuFrmwrVer.focus();
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.POLICY_STATUS,
          GROUP_ID.TARGET_TYPE,
          GROUP_ID.PUBLISH_TYPE,
        ],
      }),
    );
  }, [dispatch]);

  const onChangeFormData = useCallback((e, name, newValue) => {
    let sChecked = e.target.checked;
    let sName, sValue;

    if (isNull(newValue)) {
      sName = e.target.name;
      sValue = e.target.value;
    } else {
      sName = name;
      sValue = newValue;
    }

    setSubmitData((prevState) => ({
      ...prevState,
      [sName]: sValue,
    }));
  }, []);

  const handleDialogOpen = async (type) => {
    dispatch(GlobalLoading(true));
    setOpenDialog(true);

    setDialogInfo((prevState) => ({
      ...prevState,
      type: type === 'wifiFrmwrVer' ? '1' : '2',
    }));

    setOpenDialog(true);
    dispatch(GlobalLoading(false));
  };

  const dialogClose = useCallback(
    async (type, selectedRow) => {
      setOpenDialog(false);

      dispatch(setDialogParams('initialState'));

      const name = type === '1' ? 'wifiFrmwrVer' : 'mcuFrmwrVer';

      const frmwrId = type === '1' ? 'wifiFrmwrId' : 'mcuFrmwrId';

      if (!isNull(selectedRow)) {
        setSubmitData((prevState) => ({
          ...prevState,
          [name]: selectedRow.frmwrVer,
          [frmwrId]: selectedRow.frmwrId,
        }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!policyStatusList || !publishTypeList || !targetTypeList) {
      fetchComCodeList();
    }

    if (isEdit) {
      setSubmitData((prevState) => ({
        ...prevState,
        ...params,
        useYn: params.useYn === 'Y',
        regDate: dateToTimestampConvert(params.regDate),
        updDate: dateToTimestampConvert(params.updDate),
      }));
    } else {
      setSubmitData((prevState) => ({
        ...prevState,
        ...params,
        policyStatus: '1',
        publishType: '1',
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card component="form" onSubmit={async (e) => await handleSubmit(e)}>
      <CardHeader
        title={
          <Typography variant={'h3'}>
            {isEdit ? texts.fotaPolicyMdf : texts.fotaPolicyAdd}
          </Typography>
        }
        classes={{
          root: classes.root,
          title: classes.title,
        }}
      />
      <Divider />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/*정책 이름*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.policyNm}
              type="textBox"
              name="policyName"
              id={texts.policyNm}
              value={submitData.policyName || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 128)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*정책 설명*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.policyDesc}
              type="textBox"
              name="policyDesc"
              id={texts.policyDesc}
              value={submitData.policyDesc || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 2048)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*배포 대상유형*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              label={texts.publishTargetType}
              name="targetType"
              id={texts.publishTargetType}
              value={submitData.targetType || ''}
              onChange={onChangeFormData}
              optionArray={targetTypeList}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*대상 아이디*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.targetId}
              type="textBox"
              name="targetId"
              id={texts.targetId}
              value={submitData.targetId || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 18)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*배포 유형*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              name="publishType"
              label={texts.publishType}
              id={texts.publishType}
              value={submitData.publishType || ''}
              onChange={onChangeFormData}
              optionArray={publishTypeList}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*예약 시간*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.reserveTime}
              type="datetime-local"
              name={'publishDate'}
              id={texts.reserveTime}
              InputLabelProps={{
                shrink: true,
              }}
              value={submitData.publishDate}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              disabled={submitData.publishType !== '2'}
            />
          </Grid>
          {/*정책 상태*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              name="policyStatus"
              label={texts.policyStatus}
              id={texts.policyStatus}
              value={submitData.policyStatus || '1'}
              onChange={(e) => onChangeFormData}
              optionArray={policyStatusList}
              disabled={!isEdit}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/* WIFI 펌웨어 버전 */}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.wifiFirmwareVer}
              type={'textBox'}
              name="wifiFrmwrVer"
              id={texts.wifiFirmwareVer}
              value={submitData.wifiFrmwrVer || ''}
              onClick={() => handleDialogOpen('wifiFrmwrVer')}
              ref={ref}
              fullWidth
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/* MCU 펌웨어 버전 */}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.mcuFirmwareVer}
              type={'MCU'}
              name="mcuFrmwrVer"
              id={texts.mcuFirmwareVer}
              value={submitData.mcuFrmwrVer || ''}
              onClick={() => handleDialogOpen('mcuFrmwrVer')}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
              ref={ref}
              fullWidth
            />
          </Grid>
          {/* 등록자 아이디 */}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={!isEdit ? texts.regCharId : texts.mdfCharId}
              type="textBox"
              name={'regId'}
              id={t('word.reg') + t('word.char') + ' ' + t('word.id')}
              value={!isEdit ? submitData.regId : submitData.updId}
              disabled
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <CButton
              key={texts.cancel}
              type="cancel"
              onClick={() => navigate('/fota/fotaPolicyMgmt')}
              sx={{ mr: 3 }}
            >
              {t('word.cancel')}
            </CButton>
            <CButton type="save" onClick={(e) => handleValidation(e)}>
              {t('word.save')}
            </CButton>
          </Grid>
        </Grid>
      </CardContent>
      {openDialog && (
        <FotaPolicyMgmtDialog
          open={openDialog}
          onClose={dialogClose}
          maxWidth={'md'}
          dialogInfo={dialogInfo}
        />
      )}
    </Card>
  );
};

export default FotaPolicyMgmtDetail;
