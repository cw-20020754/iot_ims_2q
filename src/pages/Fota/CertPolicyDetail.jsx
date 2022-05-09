import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import fotaStyles from './FotaStyle';
import { useTranslation } from 'react-i18next';
import CSelect from 'components/basic/CSelect';
import rules from 'common/rules';
import { dateToTimestampConvert, isNull } from 'common/utils';
import { useTheme } from '@mui/styles';
import CInput from 'components/basic/CInput';
import CButton from 'components/basic/CButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from 'common/constants';
import { postComCodeList } from '@/redux/reducers/adminMgmt/comCodeMgmt';
import dayjs from 'dayjs';
import { GlobalLoading, setSnackbar } from '@/redux/reducers/common/sharedInfo';
import {
  postCertPolicy,
  putCertPolicy,
} from '@/redux/reducers/fota/certPolicyMgmt';
import i18n from 'common/locale/i18n';

const CertPolicyDetail = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = fotaStyles();
  const { t } = useTranslation();
  const ref = React.createRef();
  const navigate = useNavigate();
  const location = useLocation();

  let hasError = false;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { isEdit } = !isNull(location.state) ? location.state : false;
  const { params } = !isNull(location.state) ? location.state : {};

  const [submitData, setSubmitData] = useState({
    useYn: true,
    policyStatus: '1',
    policyId: '',
    regId: 'i.Trust',
    regDate: null,
    updId: 'i.Trust',
    updDate: null,
    publishDate: dayjs(new Date())
      .hour(0)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DDTHH:mm'),
  });

  const texts = {
    firmwareAdd: t('word.cert') + t('word.policy') + ' ' + t('word.add'),
    firmwareMdf: t('word.cert') + t('word.policy') + ' ' + t('word.mdf'),
    policyName: t('word.policy') + ' ' + t('word.nm'),
    policyDesc: t('word.policy') + ' ' + t('word.desc'),
    publishTargetType:
      t('word.publish') + ' ' + t('word.target') + ' ' + t('word.type'),
    targetId: t('word.serial'),
    publishType: t('word.publish') + ' ' + t('word.type'),
    reservationTime: t('word.reservation') + ' ' + t('word.time'),
    certType: t('word.cert') + ' ' + t('word.type'),
    policyStatus: t('word.policy') + ' ' + t('word.status'),
    regCharId: t('word.reg') + t('word.char') + ' ' + t('word.id'),
    mdfCharId: t('word.mdf') + t('word.char') + ' ' + t('word.id'),
    devModelCode: t('word.devModelCode'),
    cancel: t('word.cancel'),
    save: t('word.save'),
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

  const certTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.CERT_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

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
      [sName]: sName === 'useYn' ? sChecked : sValue,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasError === true) {
      hasError = false;
      return;
    }
    dispatch(GlobalLoading(true));

    // console.log('@@@@@ submitData >> ', submitData);

    let result;

    const formData = {
      ...submitData,
      publishDate:
        Number(submitData.publishType) === 2 && !isNull(submitData.publishDate)
          ? dateToTimestampConvert(submitData.publishDate)
          : null,
      applyCertType: Number(submitData.applyCertType),
      targetType: Number(submitData.targetType),
      publishType: Number(submitData.publishType),
      policyStatus: Number(submitData.policyStatus),
    };

    // 인증정책 등록
    if (!isEdit) {
      result = await dispatch(
        postCertPolicy({
          formData: formData,
        }),
      );
    } else {
      result = await dispatch(
        putCertPolicy({
          formData: formData,
        }),
      );
    }

    if (
      !isNull(result) &&
      !isNull(result.payload) &&
      !isNull(result.payload.data) &&
      result.payload.data.header.success
    ) {
      await dispatch(
        setSnackbar({
          snackbarOpen: true,
          severity: 'success',
          snackbarMessage: i18n.t('desc.saveSuccess'),
          autoHideDuration: 3000,
        }),
      );

      navigate('/fota/certPolicy');
    } else {
      const text = !isNull(result.payload.data.header)
        ? result.payload.data.header.message
        : i18n.t('desc.tempError');
      await dispatch(
        setSnackbar({
          snackbarOpen: true,
          severity: 'error',
          snackbarMessage: text,
          autoHideDuration: 3000,
        }),
      );
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
      applyCertType,
      policyStatus,
    } = e.target.form;

    policyName.focus();
    policyName.blur();
    policyDesc.focus();
    policyDesc.blur();
    targetType.click();
    targetType.focus();
    targetId.focus();
    targetId.blur();
    publishType.click();
    publishType.focus();
    applyCertType.click();
    applyCertType.focus();
    policyStatus.click();
    policyStatus.focus();
  };

  const handleFormChildrenError = () => {
    hasError = true;
  };

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.PUBLISH_TYPE,
          GROUP_ID.TARGET_TYPE,
          GROUP_ID.CERT_TYPE,
          GROUP_ID.POLICY_STATUS,
        ],
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      !certTypeList ||
      !policyStatusList ||
      !publishTypeList ||
      !targetTypeList
    ) {
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
            {isEdit ? texts.firmwareMdf : texts.firmwareAdd}
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
          {/* 정책 이름 */}
          <Grid item xs={6} md={6} lg={6}>
            <CInput
              label={texts.policyName}
              type="textBox"
              name="policyName"
              id={texts.policyName}
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
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 128)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*배포 유형*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              label={texts.publishType}
              name="publishType"
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
              label={texts.reservationTime}
              type="datetime-local"
              name={'publishDate'}
              id={texts.reservationTime}
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
          {/*인증 유형*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              label={texts.certType}
              name="applyCertType"
              ref={ref}
              value={submitData.applyCertType || ''}
              onChange={onChangeFormData}
              optionArray={certTypeList}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*정책 상태*/}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              label={texts.policyStatus}
              name="policyStatus"
              ref={ref}
              value={submitData.policyStatus || ''}
              onChange={onChangeFormData}
              disabled={!isEdit}
              optionArray={policyStatusList}
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
          {isEdit && (
            <Grid item xs={6} lg={6} md={6}>
              <FormControlLabel
                sx={{ padding: 2 }}
                control={
                  <Switch
                    {...label}
                    checked={submitData.useYn}
                    onChange={onChangeFormData}
                    name="useYn"
                  />
                }
                label={`${t('word.use')} ${t('word.yn')} : ${
                  submitData.useYn === true ? 'Y' : 'N'
                } `}
              />
            </Grid>
          )}
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
              onClick={(e) => {
                e.preventDefault();
                navigate('/fota/certPolicy');
              }}
              sx={{ mr: 3 }}
            >
              {t('word.cancel')}
            </CButton>
            <CButton type="submit" onClick={(e) => handleValidation(e)}>
              {t('word.save')}
            </CButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CertPolicyDetail;
