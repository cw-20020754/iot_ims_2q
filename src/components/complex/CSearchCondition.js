import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
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
import rules from '../../common/rules';
const CSearchCondition = (props) => {
  const [initial, setInitial] = useState(true);
  const { conditionList } = props;
  const classes = AppStyles();
  const codes = useSelector((state) => state.sharedInfo.codes);
  const { t } = useTranslation();
  const [searchOption, setSearchOption] = useState({});

  const onChangeFormData = useCallback((e, name, newValue) => {
    // console.log('e, name, newValue >> ', e.target, name, newValue);

    let sName, sValue;

    if (isNull(newValue)) {
      sName = e.target.name;
      sValue = e.target.value;
    } else {
      sName = name;
      sValue = newValue;
    }

    setSearchOption((prevState) => ({
      ...prevState,
      [sName]: sValue,
    }));
    // console.log('searchOption >> ', searchOption);
  }, []);

  const dialogOpen = () => {
    // console.log('dialogOpen');
    // props.onFetchData('', searchOption);
  };

  useLayoutEffect(() => {
    if (initial) {
      setInitial(false);
      conditionList.map((item) => {
        if (item.id === 'datetime-local') {
          setSearchOption((prevState) => ({
            ...prevState,
            [item.category]: item.value,
          }));
        }
        return null;
      });
    }
  }, [initial, conditionList]);

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
            const ref = React.createRef();
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
                    value={searchOption[item.category] || ''}
                    label={item.label}
                    onChange={onChangeFormData}
                    ref={ref}
                    fullWidth
                    rules={
                      item.id === 'datetime-local' && {
                        conditions: [
                          rules.dateRangeAlert(
                            searchOption.startDate,
                            searchOption.endDate,
                          ),
                        ],
                      }
                    }
                    // rules={{
                    //   // evtName: 'onkeyup',
                    //   conditions: [
                    //     rules.dateRangeAlert(searchOption.startDate, searchOption.endDate)
                    //     // rules.minLength(searchOption[item.category], 5),
                    //     // rules.maxLength(searchOption[item.category], 10),
                    //   ],
                    // }}
                  />
                )}
                {item.type === 'selectBox' && (
                  <CSelect
                    ref={ref}
                    label={item.label}
                    name={item.id}
                    value={searchOption[item.category] || ''}
                    onChange={onChangeFormData}
                    validate={{
                      evtName: '',
                      rules: ['requireAlert', 'characterOnlyAlert'],
                      option: searchOption,
                    }}
                    optionArray={getCodeCategoryItems(codes, item.category)}
                  />
                )}
                {item.type === 'autoSelectBox' && (
                  <CSlectAutocomplete
                    ref={ref}
                    value={item.value || ''}
                    name={item.id}
                    label={item.label}
                    getOption={'text'}
                    getValue={'value'}
                    optionArray={getCodeCategoryItems(codes, item.category)}
                    onChange={(e, newValue) =>
                      onChangeFormData(e, item.id, newValue.value)
                    }
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CSearchCondition;
