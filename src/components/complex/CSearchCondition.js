import React, { useCallback, useEffect } from 'react';
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
import { setSearchConditionParam } from 'redux/reducers/changeStateSlice';
import { isNull } from 'common/utils';

const CSearchCondition = (props) => {
  const { conditionList, onClickSearch, expanded, defaultValues } = props;
  const classes = AppStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const searchConditionParams = useSelector(
    (state) => state.changeState.searchConditionParams,
    shallowEqual,
  );

  const handleClickSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return onClickSearch(searchConditionParams);
  };

  const handleChangeFormData = useCallback(
    async (name, value) => {
      if (isNull(name)) {
        return;
      }

      await dispatch(setSearchConditionParam({ name, value }));
    },
    [dispatch],
  );

  const fetchDefaultSearchConditionParam = useCallback(async () => {
    for (const [name, value] of Object.entries(defaultValues)) {
      await dispatch(setSearchConditionParam({ name, value }));
    }
  }, [dispatch, defaultValues]);

  useEffect(() => {
    if (!isNull(defaultValues)) {
      fetchDefaultSearchConditionParam();
    }

    return async () => {
      await dispatch(setSearchConditionParam());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.accordionHeader}
        classes={{ content: classes.accordionContent }}
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
                      label={item.label}
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
                      defaultValue={item.defaultValue}
                      value={item.value || ''}
                      name={item.id}
                      label={item.label}
                      getOption={item.getOption}
                      getValue={item.getValue}
                      optionArray={item.optionArray}
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
