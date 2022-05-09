import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Switch,
  Typography,
} from '@mui/material';
import fotaStyles from './FotaStyle';
import { useTranslation } from 'react-i18next';
import CSlectAutocomplete from 'components/basic/CSlectAutocomplete';
import CSelect from 'components/basic/CSelect';
import rules from 'common/rules';
import { dateToTimestampConvert, isNull } from 'common/utils';
import { useTheme } from '@mui/styles';
import CInput from 'components/basic/CInput';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CButton from 'components/basic/CButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GROUP_ID, HTTP_STATUS } from 'common/constants';
import { postComCodeList } from '@/redux/reducers/adminMgmt/comCodeMgmt';
import {
  getDevModelCode,
  GlobalLoading,
  setSnackbar,
} from '@/redux/reducers/common/sharedInfo';
import { postFirmware, putFirmware } from '@/redux/reducers/fota/firmwareMgmt';
import i18n from '../../common/locale/i18n';

const FirmwareMgmtDetail = (props) => {
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
    hwType: '0',
    frmwrType: '1',
    regId: 'i.Trust',
  });

  const texts = {
    firmwareAdd: t('word.firmware') + ' ' + t('word.add'),
    firmwareMdf: t('word.firmware') + ' ' + t('word.mdf'),
    selectFile: t('desc.selectFile'),
    firmwareType: t('word.firmware') + ' ' + t('word.type'),
    firmwareNm: t('word.firmware') + ' ' + t('word.nm'),
    firmwareDesc: t('word.firmware') + ' ' + t('word.desc'),
    firmwareVer: t('word.firmware') + ' ' + t('word.ver'),
    hwType: t('word.hardware') + ' ' + t('word.type'),
    devModelCode: t('word.devModelCode'),
    useYn: t('word.use') + ' ' + t('word.yn'),
    cancel: t('word.cancel'),
    save: t('word.save'),
  };

  // 펌웨어 타입
  const frmwrTypeList = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.FIRMWARE_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;

  // 기기모델코드
  const devModelCodeList = useSelector(
    (state) => state.sharedInfo.devModelCodeList,
    shallowEqual,
  );

  const wifiHwType = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.WIFI_HW_TYPE,
      ),
    shallowEqual,
  )[0]?.codeList;
  const mcuHwType = useSelector(
    (state) =>
      state.comCodeMgmt.sharedComCodeList.filter(
        (code) => code?.groupId === GROUP_ID.MCU_HW_TYPE,
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

  const fetchComCodeList = useCallback(async () => {
    await dispatch(
      postComCodeList({
        groupIdList: [
          GROUP_ID.FIRMWARE_TYPE,
          GROUP_ID.WIFI_HW_TYPE,
          GROUP_ID.MCU_HW_TYPE,
        ],
      }),
    );
  }, [dispatch]);

  const fetchDevModeCodeList = useCallback(async () => {
    await dispatch(getDevModelCode());
  }, [dispatch]);

  const handleFormChildrenError = () => {
    hasError = true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(GlobalLoading(true));

    if (hasError === true) {
      hasError = false;
      dispatch(GlobalLoading(false));
      return;
    }

    let result;
    // 펌웨어 등록
    if (!isEdit) {
      const formData = new FormData();
      formData.append('file', submitData.file);
      formData.append('frmwrType', Number(submitData.frmwrType));
      formData.append('frmwrName', submitData.frmwrName);
      formData.append('frmwrDesc', submitData.frmwrDesc);
      formData.append('frmwrVer', submitData.frmwrVer);
      formData.append('devModelCode', submitData.devModelCode);
      formData.append(
        'hwType',
        submitData.frmwrType === '2' ? 0 : Number(submitData.hwType),
      );
      formData.append('regId', submitData.regId);

      result = await dispatch(
        postFirmware({
          formData: formData,
        }),
      );
      // 펌웨어 수정
    } else {
      result = await dispatch(
        putFirmware({
          formData: submitData,
        }),
      );
    }
    if (
      !isNull(result) &&
      !isNull(result.payload) &&
      result.payload.header.success
    ) {
      await dispatch(
        setSnackbar({
          snackbarOpen: true,
          severity: 'success',
          snackbarMessage: i18n.t('desc.saveSuccess'),
          autoHideDuration: 3000,
        }),
      );
      navigate('/fota/firmwareMgmt');
    } else {
      const text = !isNull(result.payload.header)
        ? result.payload.header.message
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
      frmwrType,
      frmwrName,
      fileName,
      frmwrDesc,
      frmwrVer,
      hwType,
      devModelCode,
    } = e.target.form;

    frmwrType.click();
    frmwrName.focus();
    frmwrName.blur();
    fileName.focus();
    fileName.blur();
    frmwrDesc.focus();
    frmwrDesc.blur();
    frmwrVer.focus();
    frmwrVer.blur();
    hwType.click();
    devModelCode.focus();
    devModelCode.blur();
  };

  // 파일 업로드
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setSubmitData((prevState) => ({
        ...prevState,
        file: e.target.files[0],
        fileName: e.target.files[0].name,
      }));
    }
  };

  useEffect(() => {
    if (!wifiHwType || !mcuHwType) {
      fetchComCodeList();
    }

    if (isEdit) {
      setSubmitData((prev) => ({
        ...prev,
        ...params,
      }));
    }

    if (!frmwrTypeList) {
      fetchComCodeList();
    }
    if (devModelCodeList.length === 0) {
      fetchDevModeCodeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadInputRef = useRef(null);

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
          {/*파일 업로드*/}
          <Grid item xs={12} md={12} lg={12}>
            <label>
              <CInput
                type="file"
                fullWidth
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={uploadInputRef}
              />

              <CButton
                sx={{ width: 1 }}
                disableRipple
                variant="text"
                onClick={() =>
                  uploadInputRef.current && uploadInputRef.current.click()
                }
              >
                {/*<AttachFileIcon*/}
                {/*  sx={{*/}
                {/*    color: theme.palette.primary.main,*/}
                {/*    mr: 1,*/}
                {/*    my: 0.5,*/}
                {/*    fontSize: '2rem',*/}
                {/*  }}*/}
                {/*/>*/}
                <CInput
                  type="textBox"
                  fullWidth
                  readOnly
                  disabled={isEdit}
                  placeholder={texts.selectFile}
                  name="fileName"
                  value={submitData.fileName || ''}
                  onValidation={(value) => rules.requireAlert(value)}
                  onValidationError={handleFormChildrenError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachFileIcon
                          sx={{
                            color: theme.palette.primary.main,
                            mb: 1.5,
                            fontSize: '1.9rem',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </CButton>
            </label>
          </Grid>
          {/*펌웨어 유형*/}
          <Grid item xs={6} md={6} lg={6}>
            <CSelect
              id="frmwrType"
              ref={ref}
              name="frmwrType"
              label={texts.firmwareType}
              value={submitData.frmwrType}
              defaultValue=""
              optionArray={frmwrTypeList}
              onChange={onChangeFormData}
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*펌웨어 이름*/}
          <Grid item xs={6} md={6} lg={6}>
            <CInput
              label={texts.firmwareNm}
              type="textBox"
              name={'frmwrName'}
              id={texts.firmwareNm}
              value={submitData.frmwrName || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 128)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*펌웨어 설명*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.firmwareDesc}
              type="textBox"
              name={'frmwrDesc'}
              id={texts.firmwareDesc}
              value={submitData.frmwrDesc || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 2048)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*펌웨어 버전*/}
          <Grid item xs={6} lg={6} md={6}>
            <CInput
              label={texts.firmwareVer}
              type="textBox"
              name="frmwrVer"
              id={texts.firmwareVer}
              value={submitData.frmwrVer || ''}
              onChange={onChangeFormData}
              ref={ref}
              fullWidth
              onValidation={(value) =>
                rules.requireAlert(value) || rules.maxLength(value, 128)
              }
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/*하드웨어 유형, */}
          <Grid item xs={6} lg={6} md={6}>
            <CSelect
              id={texts.hwType}
              label={texts.hwType}
              name="hwType"
              ref={ref}
              value={
                !isNull(wifiHwType) &&
                wifiHwType.length > 0 &&
                !isNull(mcuHwType) &&
                mcuHwType.length > 0
                  ? submitData.hwType
                  : ''
              }
              onChange={onChangeFormData}
              optionArray={
                submitData.frmwrType === '1' ? wifiHwType : mcuHwType
              }
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {/* 기기모델코드 */}
          <Grid item xs={6} lg={6} md={6}>
            <CSlectAutocomplete
              label={texts.devModelCode}
              name="devModelCode"
              ref={ref}
              getOption={'desc' || ''}
              getValue="devModelCode"
              optionArray={devModelCodeList}
              onChange={(e, newValue) =>
                onChangeFormData(
                  e,
                  'devModelCode',
                  !isNull(newValue) && newValue['devModelCode'],
                )
              }
              value={submitData.devModelCode || ''}
              color="success"
              defaultValue={
                (!isNull(params) &&
                  devModelCodeList.find(
                    (v) => v.devModelCode === params.devModelCode,
                  )) ||
                null
              }
              onValidation={(value) => rules.requireAlert(value)}
              onValidationError={handleFormChildrenError}
            />
          </Grid>
          {isEdit && (
            <Grid item xs={6} lg={6} md={6}>
              <FormControlLabel
                // sx={{ padding: 2 }}
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
                navigate('/fota/firmwareMgmt');
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

export default FirmwareMgmtDetail;
