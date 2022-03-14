import React, { useEffect, useRef, useState, uesCallback } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import fotaStyles from './FotaStyle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useTranslation } from 'react-i18next';
import CButton from '../../components/basic/CButton';
import CSlectAutocomplete from '../../components/basic/CSlectAutocomplete';
import CInput from '../../components/basic/CInput';
import CSelect from '../../components/basic/CSelect';
import rules from '../../common/rules';
import { isNull } from '../../common/utils/utils';

const FirmwareManageDetail = () => {
  const classes = fotaStyles();
  const t = useTranslation();
  const ref = React.createRef();
  const validate = {
    evtName: 'keyup',
    rules: ['requireAlert', 'characterOnlyAlert'],
  };

  const [cValue, setCvalue] = useState('');

  // const onChangeFormData = uesCallback((e) => {
  //   const { name, value } = e.target;
  //
  //   console.log('name , value >> ', name, value);
  // }, []);

  const handleChange = (e, newValue) => {
    // console.log('ref >> ', ref.current.value);
    // console.log('handlechange >> ', e.target.value);
    setCvalue(newValue);
  };

  useEffect(() => {
    if (!isNull(ref)) {
      // console.log('validate >> ', ref.current);
    }

    // ref.current.value = cValue;
    // ref.current.onkeyup = onChangeFormData;
  }, [cValue, ref]);

  return (
    <Box>
      <Stack spacing={2} direction={'row'}>
        {/*<CInput label="teset" required={false} onChange={onselect} ref={ref} />*/}

        <CSelect
          label={'1'}
          name={'1'}
          optionArray={[
            { text: 1, value: 1 },
            { text: 2, value: 2 },
          ]}
          color={'success'}
          style={{ m: 1, minWidth: 300 }}
          ref={ref}
          value={cValue || ''}
          onChange={handleChange}
          // validate={{
          //   evtName: '',
          //   rules: ['requireAlert', 'characterOnlyAlert'],
          // }}
          rules={{
            conditions: [rules.requireAlert(cValue)],
          }}
        />
        <CSlectAutocomplete
          ref={ref}
          name={'test'}
          getOption={'text'}
          label={'기기모델코드'}
          optionArray={[
            { text: '히든프로(CHP)[02FER]', value: '02FER', label: '02FER' },
            { text: '히든프로(CP)[02FES]', value: '02FES', label: '02FES' },
          ]}
          getValue={'value'}
          value={cValue || ''}
          onChange={(e, newValue) => handleChange(e, newValue)}
          style={{ m: 1, minWidth: 300 }}
          rules={{
            conditions: [rules.requireAlert(cValue)],
          }}
        />
        {/*{cValue}*/}
        {/*<CSlectAutocomplete*/}
        {/*  name={'test'}*/}
        {/*  optionArray={[*/}
        {/*    { label: 'The Godfather', id: 1 },*/}
        {/*    { label: 'Pulp Fiction', id: 2 },*/}
        {/*  ]}*/}
        {/*  getOption={'id'}*/}
        {/*  style={{ m: 1, minWidth: 200 }}*/}
        {/*  autoHighlight*/}
        {/*/>*/}
        {/*<CButton text={'저장'} variant="outlined" onClick={onClickData} />*/}
        {/*<CButton text={'취소'} type={'cancel'} variant="outlined" />*/}
        {/*<CButton text={'검색'} type={'success'} />*/}
        {/*<CButton*/}
        {/*  name={'download'}*/}
        {/*  variant="text"*/}
        {/*  type={'success'}*/}
        {/*  startIcon={<SaveAltIcon />}*/}
        {/*  text={'다운로드'}*/}
        {/*/>*/}
        {/*<CSlectAutocomplete*/}
        {/*  name={'test'}*/}
        {/*  optionArray={['1', '2', '3']}*/}
        {/*  onChange={onClickData}*/}
        {/*  style={{ m: 1, minWidth: 300 }}*/}
        {/*/>*/}
      </Stack>
    </Box>
  );
};

export default FirmwareManageDetail;
