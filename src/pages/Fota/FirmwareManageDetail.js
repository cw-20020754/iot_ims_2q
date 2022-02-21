import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import fotaStyles from './FotaStyle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useTranslation } from 'react-i18next';
import CButton from '../../components/basic/CButton';
import CSlectAutocomplete from '../../components/basic/CSlectAutocomplete';

const FirmwareManageDetail = () => {
  const classes = fotaStyles();
  const t = useTranslation();

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
  };
  const onClickData = (e) => {};

  return (
    <Box>
      {/*<CInput onChangeFormData={onChangeFormData} />*/}
      <Stack spacing={2} direction={'row'}>
        <CButton text={'저장'} variant="outlined" onClick={onClickData} />
        <CButton text={'취소'} type={'cancel'} variant="outlined" />
        <CButton text={'검색'} type={'success'} />
        <CButton text={'검색'} type={'success'} variant={'text'} />
        <CButton
          name={'download'}
          variant="text"
          type={'success'}
          startIcon={<SaveAltIcon />}
          text={'다운로드'}
        />
        <CSlectAutocomplete
          name={'test'}
          optionArray={['1', '2', '3']}
          onChange={onClickData}
        />
      </Stack>
    </Box>
  );
};

export default FirmwareManageDetail;
