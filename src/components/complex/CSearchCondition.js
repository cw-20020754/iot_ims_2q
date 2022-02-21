import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import AppStyles from '../layout/AppStyle';
import { getCodeCategoryItems, isNull } from '../../common/utils';
import CInput from '../basic/CInput';
import CSelect from '../basic/CSelect';
import CSlectAutocomplete from '../basic/CSlectAutocomplete';
import CButton from '../basic/CButton';
const CSearchCondition = (props) => {
  const { conditionList } = props;
  const classes = AppStyles();
  const codes = useSelector((state) => state.sharedInfo.codes);
  const { t } = useTranslation();
  const [searchOption, setSearchOption] = useState({
    frmwrName: '',
    frmwrType: '',
    devModelCode: '',
    frmwrVer: '',
    startDate: dayjs(new Date())
      .add(-7, 'days')
      .hour(0)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DDTHH:mm'),
    endDate: dayjs(new Date())
      .hour(23)
      .minute(59)
      .second(59)
      .format('YYYY-MM-DDTHH:mm'),
  });

  const onChangeFormData = (e, name, value) => {
    let sName, sValue;
    // console.log('e, name, value  >> ', e, name, value);
    if (isNull(name) && isNull(value)) {
      sName = e.target.name;
      sValue = e.target.value;
    } else {
      sName = name;
      sValue = value;
    }
    setSearchOption((prevState) => ({
      ...prevState,
      [sName]: sValue,
    }));
    // const { name } = e.target;
    // console.log('e , value >> ', e, value);
    // console.log('name >> ', name, value);
  };

  const onClickButton = () => {
    // console.log('onclickbutton');
    // props.onFetchData('', searchOption);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.accordionHeader}
      >
        <Typography>{t('word.search')}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Grid container spacing={3}>
          {conditionList.map((item, index) => {
            return (
              <Grid
                item
                xs={item.size.xs}
                lg={item.size.lg}
                md={item.size.md}
                key={item.category}
              >
                {item.type === 'textBox' && (
                  <CInput
                    id={item.id}
                    name={item.category}
                    type={item.id}
                    value={item.value}
                    label={item.label}
                  />
                )}
                {item.type === 'selectBox' && (
                  <CSelect
                    label={item.label}
                    name={item.id}
                    optionArray={getCodeCategoryItems(codes, item.category)}
                  />
                )}
                {item.type === 'autoSelectBox' && (
                  <CSlectAutocomplete
                    name={item.id}
                    label={item.label}
                    getOption={'text'}
                    optionArray={getCodeCategoryItems(codes, item.category)}
                  />
                )}
              </Grid>
            );
          })}
          <CButton
            text={t('word.search')}
            variant={'outlined'}
            type={'success'}
            style={{
              width: '150px',
              height: '35px',
              marginTop: '30px',
              marginLeft: '30px',
            }}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CSearchCondition;
