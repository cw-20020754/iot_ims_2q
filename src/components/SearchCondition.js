import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppStyles from './AppStyle';
import { getCodeCategoryItems, isNull } from '../common/utils';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import InputField from './UiComponent/input-group/InputField';
const SearchCondition = (props) => {
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

  const onChangeFormData = (e) => {
    // console.log("e >>>> ", e.target);
    const { name, value } = e.target;

    // console.log("name , value >> ", name, value);

    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                  <InputField
                    id={item.id}
                    name={item.category}
                    type={item.id}
                    value={item.value}
                    label={item.label}
                  />
                )}
                {item.type === 'selectBox' && (
                  <FormControl fullWidth size="small" variant={'standard'}>
                    <InputLabel id="demo-simple-select-standard-label">
                      {item.label}
                    </InputLabel>
                    <Select
                      // defaultValue=""
                      // value={
                      //   !isNull(searchOption[item.id])
                      //     ? searchOption[item.id]
                      //     : " "
                      // }
                      name={item.id}
                      onChange={(value) => onChangeFormData(value)}
                      labelId="demo-simple-select-filled-label"
                    >
                      {getCodeCategoryItems(codes, item.category).map(
                        (name) => (
                          <MenuItem key={name.text} value={name.value}>
                            {name.text}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
                {item.type === 'autoSelectBox' && (
                  <Autocomplete
                    name={item.id}
                    options={getCodeCategoryItems(codes, item.category).map(
                      (option) => option.text,
                    )}
                    onChange={onChangeFormData}
                    onInputChange={(event, newInputValue) => {
                      onChangeFormData(event);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={item.label}
                        variant="standard"
                        name={item.id}
                      />
                    )}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
        <Button
          variant={'outlined'}
          onClick={() => {
            props.onFetchData('', searchOption);
          }}
        >
          {t('word.search')}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default SearchCondition;
