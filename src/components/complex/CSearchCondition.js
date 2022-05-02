import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import AppStyles from 'components/layout/AppStyle';
import CInput from 'components/basic/CInput';
import CSelect from 'components/basic/CSelect';
import CSlectAutocomplete from 'components/basic/CSlectAutocomplete';
import CButton from 'components/basic/CButton';
import { setSearchConditionParam } from 'redux/reducers/common/sharedInfo';
import { isNull } from 'common/utils';
import rules from 'common/rules';

const CSearchCondition = (props) => {
  const {
    conditionList,
    onClickSearch,
    defaultExpanded,
    defaultValues,
    autoClear,
  } = props;
  const classes = AppStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [expanded, setExpaned] = useState(false);

  const autoCRef = useRef(null);

  const searchConditionParams = useSelector(
    (state) => state.sharedInfo.searchConditionParams,
    shallowEqual,
  );

  const handleClickSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasError === true) {
      setHasError(false);
      return;
    }

    checkValidation(e);

    return onClickSearch(searchConditionParams);
  };

  const checkValidation = (e) => {
    let check = true;
    conditionList &&
      conditionList.map((item) => {
        if (!isNull(item.rules)) {
          e.target.form[item.id].focus();
          e.target.form[item.id].blur();
        }
        return item;
      });

    return check;
  };

  const handleChangeFormData = useCallback(
    async (name, value) => {
      if (isNull(name)) {
        return;
      }

      // console.log('name ,  value >> ', name, value);

      if (autoClear && !isNull(autoCRef.current)) {
        const ele = autoCRef.current.getElementsByClassName(
          'MuiAutocomplete-clearIndicator',
        )[0];
        if (ele) ele.click();
      }

      await dispatch(setSearchConditionParam({ name, value }));
    },
    [dispatch, autoClear],
  );

  const fetchDefaultSearchConditionParam = useCallback(async () => {
    for (const [name, value] of Object.entries(defaultValues)) {
      await dispatch(setSearchConditionParam({ name, value }));
    }
  }, [dispatch, defaultValues]);

  const handleFormChildrenError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (!isNull(defaultValues)) {
      fetchDefaultSearchConditionParam();
    }

    if (!isNull(defaultExpanded)) {
      setExpaned(defaultExpanded);
    }

    return async () => {
      await dispatch(setSearchConditionParam());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Accordion expanded={expanded} component="form">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.accordionHeader}
        classes={{ content: classes.accordionContent }}
        onClick={() => setExpaned(!expanded)}
      >
        <Typography>{t('word.search')}</Typography>
        <CButton
          color={'success'}
          style={{ margin: '0 20px' }}
          onClick={(e) => handleClickSearch(e)}
        >
          {t('word.search')}
        </CButton>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {conditionList &&
            conditionList.map((item, index) => {
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
                      value={searchConditionParams[item.category] || ''}
                      label={item.id !== 'datetime-local' ? item.label : ' '}
                      onChange={(e) =>
                        handleChangeFormData(e.target.name, e.target.value)
                      }
                      fullWidth
                      onValidation={item.onValidation}
                    />
                  )}
                  {item.type === 'selectBox' && (
                    <CSelect
                      label={item.label}
                      name={item.id}
                      value={searchConditionParams[item.category] || ''}
                      onChange={(e) => {
                        handleChangeFormData(e.target.name, e.target.value);
                      }}
                      optionArray={item.optionArray}
                    />
                  )}
                  {item.type === 'autoSelectBox' && (
                    <CSlectAutocomplete
                      ref={autoCRef}
                      defaultValue={item.defaultValues}
                      value={item.value || ''}
                      name={item.id}
                      label={item.label}
                      getOption={item.getOption}
                      getValue={item.getValue}
                      optionArray={item.optionArray}
                      onValidation={(value) =>
                        item.rules && rules[item.rules](value)
                      }
                      onValidationError={handleFormChildrenError}
                      onChange={(e, newValue) => {
                        handleChangeFormData(
                          item.id,
                          item.getValue && newValue
                            ? newValue[item.getValue]
                            : newValue,
                        );
                      }}
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
