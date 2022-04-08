import CDialog from '../../components/basic/CDialog';
import CDialogTitle from '../../components/basic/CDialogTitle';
import CButton from '../../components/basic/CButton';
import CDialogContent from '../../components/basic/CDialogContent';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import CSlectAutocomplete from '../../components/basic/CSlectAutocomplete';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCodeCategoryItems } from '../../common/utils';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardHeader,
  Checkbox,
  DialogActions,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import IotProtocolStyle from './IotProtocolStyle';
import { useTheme } from '@mui/styles';
import { reformatCheckList } from '../../common/iotProtocol';

const ProtocolChangeDialog = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, onClose, dialogInfo, maxWidth } = props;

  const classes = IotProtocolStyle();
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(null);
  // const [checked, setChecked] = useState([]);

  const [initial, setInitial] = useState(true);
  const [apiList, setApiList] = useState([]);
  const [usedList, setUsedList] = useState([]);
  const [unusedList, setUnusedList] = useState([]);

  // const { protocolApiList, usedProtocolList, unusedProtocolList } = useSelector(
  //   (state) => state.iotProtocol,
  //   shallowEqual,
  // );

  // console.log('open >> ', open);

  const protocolApiList = useSelector(
    (state) => state.iotProtocol.protocolApiList,
    shallowEqual,
  );

  const usedProtocolList = useSelector(
    (state) => state.iotProtocol.usedProtocolList,
    shallowEqual,
  );

  const unusedProtocolList = useSelector(
    (state) => state.iotProtocol.unusedProtocolList,
    shallowEqual,
  );

  // console.log('protocolApiList >> ', protocolApiList);
  // console.log('usedProtocolList >> ', usedProtocolList);
  // console.log('unusedProtocolList >> ', unusedProtocolList);

  const codes = useSelector((state) => state.sharedInfo.codes);

  const handleChange = (e) => {};

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  const handleToggleAll = (e, type, items) => {
    const { checked } = e.target;

    // console.log('checked >> ', checked);
    const array = reformatCheckList(items, checked);
    // //
    //

    if (type === 'protocolApiList') {
      setApiList(array);
    } else if (type === 'usedProtocolList') {
      setUsedList(array);
    } else {
      setUnusedList(array);
    }

    // dispatch(
    //   handleCheckdAll({
    //     type: type,
    //     array: items,
    //     checked: checked,
    //   }),
    // );
  };

  useLayoutEffect(() => {
    if (initial) {
      setApiList(protocolApiList);
      setUsedList(usedProtocolList);
      setUnusedList(unusedProtocolList);
      setInitial(false);
    }
  }, [initial, protocolApiList, usedProtocolList, unusedProtocolList]);

  const [checkedList, setCheckedLists] = useState([]);
  const onCheckedAll = useCallback((checked) => {
    if (checked) {
      const checkedListArray = [];

      // dataLists.forEach((list) => checkedListArray.push(list));

      setCheckedLists(checkedListArray);
    } else {
      setCheckedLists([]);
    }
  }, []);

  const protocolChangeList = (type, title, items) => {
    // console.log('items >> ', items);

    return (
      <Card
        sx={{
          border: `1px solid ${theme.palette.grey[500]}`,
          borderRadius: 1,
          margin: 2,
        }}
      >
        <CardHeader
          sx={{ px: 1, py: 1 }}
          avatar={
            <Checkbox
              sx={{ pr: '5px' }}
              // onClick={(e) => handleToggleAll(e, type, items)}
              onClick={(e) => onCheckedAll(e.target.checked)}
              // checked={type === }

              // checked={checkedList.length === }
              // checked={
              //   numberOfChecked(items) === items.length && items.length !== 0
              // }
              // indeterminate={
              // 	numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              // }
              // disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          title={title}
          classes={{
            title: classes.headerTitle,
            avatar: classes.headerAvatar,
          }}
          // subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider sx={{ borderColor: theme.palette.grey[500] }} />
        <List
          sx={{
            // width: 500,
            height: 400,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {items &&
            items.map((item, index) => {
              const labelId = item.groupNm;
              return (
                <ListItem
                  key={labelId}
                  sx={{
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                  role="listitem"
                  onClick={handleToggle(item)}
                >
                  <FormControlLabel
                    key={labelId}
                    label={labelId}
                    control={
                      <Checkbox
                        checked={item.checked}
                        // indeterminate={checked[0] !== checked[1]}
                        onClick={handleToggle}
                      />
                    }
                  />
                  {/*<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>*/}
                  {/*  {item.children &&*/}
                  {/*    item.children.map((value, index) => {*/}
                  {/*      return (*/}
                  {/*        <FormControlLabel*/}
                  {/*          key={value.desc}*/}
                  {/*          label={<pre>{value.desc}</pre>}*/}
                  {/*          control={*/}
                  {/*            <Checkbox*/}
                  {/*              checked={value.checked}*/}
                  {/*              onClick={handleToggle}*/}
                  {/*              // onChange={handleChange2}*/}
                  {/*            />*/}
                  {/*          }*/}
                  {/*        />*/}
                  {/*      );*/}
                  {/*    })}*/}
                  {/*</Box>*/}
                </ListItem>
              );
            })}
          <ListItem />
        </List>
      </Card>
    );
  };

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [right, setRight] = React.useState([4, 5, 6, 7, 8, 9, 0, 10]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <CDialog open={open} onClose={onClose} maxWidth={'xl'}>
      <CDialogTitle
        title="제품 프로토콜 변경 - 전체"
        sx={{ padding: '12px 34px' }}
        // gridsx={{ flexDirection: 'column' }}
      >
        <Typography>
          [ 전체 프로토콜 / 정수기 / MQTT / 02FIH - 아이콘 22년형(CHIP) ]
        </Typography>
      </CDialogTitle>
      <CDialogContent grids={[3, 12, 12]}>
        <CSlectAutocomplete
          name={'test'}
          getOption={'text'}
          label={t('word.devModelCode')}
          optionArray={getCodeCategoryItems(codes, 'devModelCode')}
          getValue={'value'}
          value={selectedValue}
          onChange={(e, newValue) => handleChange(e, newValue)}
          style={{ m: 1, minWidth: 300, padding: 1 }}
        />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            {/*<Grid item>{customList(t('word.all'), apiList)}</Grid>*/}
            {protocolChangeList(
              'protocolApiList',
              t('word.all'),
              protocolApiList,
            )}
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
            {/* 사용*/}
            <Grid item xs={5}>
              {protocolChangeList(
                'usedProtocolList',
                t('word.use'),
                usedProtocolList,
              )}
            </Grid>
            {/* moved button */}
            <Grid
              item
              xs={2}
              container
              direction={'column'}
              alignItems="center"
            >
              <CButton
                sx={{ my: 1.5 }}
                variant="outlined"
                size="large"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </CButton>
              <CButton
                sx={{ my: 1.5 }}
                variant="outlined"
                size="large"
                onClick={handleCheckedRight}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </CButton>
            </Grid>
            {/* 미사용 */}
            <Grid item xs={5}>
              {/*{customList(t('word.unused'), right)}*/}
              {protocolChangeList(
                'unusedProtocolList',
                t('word.unused'),
                unusedProtocolList,
              )}
            </Grid>
            {/*<Grid>{customList(t('word.unused'), right)}</Grid>*/}
          </Grid>
        </Grid>
      </CDialogContent>
      <DialogActions sx={{ padding: 4 }}>
        <CButton variant="outlined" type={'cancel'} onClick={() => onClose()}>
          {t('word.cancel')}
        </CButton>
        <CButton variant="outlined" type={'save'}>
          {t('word.save')}
        </CButton>
      </DialogActions>
    </CDialog>
  );
};

export default React.memo(ProtocolChangeDialog);
