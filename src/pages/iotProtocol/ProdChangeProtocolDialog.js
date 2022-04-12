import CDialog from 'components/basic/CDialog';
import CDialogTitle from 'components/basic/CDialogTitle';
import CButton from 'components/basic/CButton';
import CDialogContent from 'components/basic/CDialogContent';
import CDialogActions from 'components/basic/CDialogActions';
import React, { useCallback, useEffect, useState } from 'react';
import CSlectAutocomplete from 'components/basic/CSlectAutocomplete';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { isNull, makeQuery } from 'common/utils';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  Chip,
} from '@mui/material';
import IotProtocolStyle from './IotProtocolStyle';
import { useTheme } from '@mui/styles';
import {
  getChangeProtocolByProduct,
  handleChangeList,
  handleCheckLists,
  postProtocolByProduct,
} from 'redux/reducers/iotProtocolSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { checkedToggleAll } from 'common/iotProtocol';
import { GlobalLoading, setSnackbar } from 'redux/reducers/changeStateSlice';
import { HTTP_STATUS } from 'common/constants';
import CTree from 'components/basic/CTree';

const ProdChangeProtocolDialog = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, onClose, dialogInfo, maxWidth } = props;

  const classes = IotProtocolStyle();
  const theme = useTheme();

  const [selectedValue, setSelectedValue] = useState('');

  const protocolApiList = useSelector(
    (state) => state.iotProtocol.protocolApiList,
    shallowEqual,
  );
  const devModelCodeList = useSelector(
    (state) => state.changeState.devModelCodeList,
    shallowEqual,
  ); // 기기모델코드

  const usedProtocolList = useSelector(
    (state) => state.iotProtocol.usedProtocolList,
    shallowEqual,
  );

  const unusedProtocolList = useSelector(
    (state) => state.iotProtocol.unusedProtocolList,
    shallowEqual,
  );

  const dataGridTitle = useSelector(
    (state) => state.iotProtocol.dataGridTitle,
    shallowEqual,
  );
  // console.log('protocolApiList >> ', protocolApiList);
  // console.log('usedProtocolList >> ', usedProtocolList);
  // console.log('unusedProtocolList >> ', unusedProtocolList);

  // 체크된 것 찾기
  const findCheckList = (list) => {
    return (
      list &&
      list
        .filter((v) => v.checked)
        .map((i) => {
          return {
            ...i,
            children: i.children.filter((a) => a.checked),
          };
        })
    );
  };

  // 체크된 값 삭제
  const removeCheckedList = (list) => {
    return list
      .filter((v) => v.children.some((value) => !value.checked))
      .map((v) => {
        return {
          ...v,
          checked: false,
          children: v.children.filter((value) => !value.checked),
        };
      });
  };

  // 전체 box usedList에 있는 값으로 매핑
  const setCheckedUsedList = (apiList, usedList) => {
    return apiList.map((v) => {
      const result = usedList.find((value) => value.groupCode === v.groupCode);
      if (!isNull(result)) {
        return {
          ...v,
          checked: true,
          children: v.children?.map((i) => ({
            ...i,
            checked: true,
          })),
        };
      } else {
        return {
          ...v,
          checked: false,
          children: v.children?.map((i) => ({
            ...i,
            checked: false,
          })),
        };
      }
    });
  };
  // 리스트 추가
  const addList = (list, movedList) => {
    let array = list;

    // 요소에 없는값 추가
    const results = movedList.filter(
      ({ groupCode: id1 }) => !array.some(({ groupCode: id2 }) => id2 === id1),
    );

    if (results.length > 0) {
      array = [...array, ...results].sort(
        (a, b) =>
          Number(a.groupCode.split('-')[0]) - Number(b.groupCode.split('-')[0]),
      );
    }

    return (
      array &&
      array.map((v) => {
        const data = movedList.find((f) => f.groupCode === v.groupCode);

        if (!isNull(data) && results.length === 0) {
          return {
            ...v,
            children: [...v.children, ...data.children].sort(
              (a, b) => a.valueSeq - b.valueSeq,
            ),
          };
        } else {
          return v;
        }
      })
    );
  };

  // 전체 해제한 경우 미사용으로 이동
  const moveUnUsedList = useCallback(
    (nodes) => {
      const cloneApiList = [...protocolApiList.children];
      const cloneUsedList = [...usedProtocolList.children];
      const cloneUnusedList = [...unusedProtocolList.children];

      const usedList = cloneUsedList.filter(
        (v) => v.groupCode.split('-')[0] !== nodes.groupCode,
      );

      const moveUnusedList = cloneUsedList.filter(
        (v) => v.groupCode.split('-')[0] === nodes.groupCode,
      );

      const unusedList = addList(cloneUnusedList, moveUnusedList);

      dispatch(
        handleChangeList({
          protocolApiList: cloneApiList,
          usedProtocolList: usedList,
          unusedProtocolList: unusedList,
        }),
      );
    },
    [
      dispatch,
      protocolApiList.children,
      usedProtocolList.children,
      unusedProtocolList.children,
    ],
  );

  const handleCheckedRight = () => {
    const cloneApiList = [...protocolApiList.children];
    const cloneUsedList = [...usedProtocolList.children];
    const cloneUnusedList = [...unusedProtocolList.children];

    const checkdedList = checkedToggleAll(findCheckList(cloneUsedList), false);

    const usedList = removeCheckedList(cloneUsedList);

    const apiList = setCheckedUsedList(cloneApiList, usedList);

    const unusedList = addList(cloneUnusedList, checkdedList);

    dispatch(
      handleChangeList({
        protocolApiList: apiList,
        usedProtocolList: usedList,
        unusedProtocolList: unusedList,
      }),
    );
  };

  const handleCheckedLeft = () => {
    const cloneApiList = [...protocolApiList.children];
    const cloneUsedList = [...usedProtocolList.children];
    const cloneUnusedList = [...unusedProtocolList.children];

    const checkdedList = checkedToggleAll(
      findCheckList(cloneUnusedList),
      false,
    );

    const unusedList = removeCheckedList(cloneUnusedList);

    const usedList = addList(cloneUsedList, checkdedList);

    const apiList = setCheckedUsedList(cloneApiList, usedList);

    dispatch(
      handleChangeList({
        protocolApiList: apiList,
        usedProtocolList: usedList,
        unusedProtocolList: unusedList,
      }),
    );
  };

  const handleSave = async () => {
    const list = usedProtocolList.children;

    let valueSeqList = [];
    let controlValueSeqList = [];
    list &&
      list.map((v) => {
        const valueSeq = v.children.map((el) => el.valueSeq);

        valueSeqList = [...valueSeqList, ...valueSeq];
        if (v.groupCode === '0002-A1011') {
          controlValueSeqList = valueSeq;
        }
        return v;
      });

    const result = await dispatch(
      postProtocolByProduct({
        prodTypeCode: dialogInfo.searchCondition.prodTypeCode,
        typeCode: dialogInfo.searchCondition.typeCode,
        devModelCode: dialogInfo.searchCondition.devModelCode,
        valueSeqList: valueSeqList,
        controlValueSeqList: controlValueSeqList,
      }),
    );

    if (
      !isNull(result) &&
      !isNull(result.payload) &&
      result.payload.status === HTTP_STATUS.SUCCESS
    ) {
      await dispatch(
        setSnackbar({
          snackbarOpen: true,
          severity: 'success',
          snackbarMessage: t('desc.saveSuccess'),
          autoHideDuration: 3000,
        }),
      );
    }
    onClose();
  };

  const fetchProtocolData = useCallback(
    async (params) => {
      await dispatch(
        getChangeProtocolByProduct({
          param: makeQuery(params),
        }),
      );

      dispatch(GlobalLoading(false));
    },
    [dispatch],
  );

  const handleChange = async (e, newValue) => {
    if (!isNull(newValue)) {
      dispatch(GlobalLoading(true));
      setSelectedValue(newValue);

      await fetchProtocolData({
        ...dialogInfo.searchCondition,
        devModelCode: newValue.devModelCode,
      });
    }
  };

  const getLabel = (nodes) => {
    if (nodes.id === 'root') return nodes.name;
    else if (!isNull(nodes.desc)) return nodes.desc;
    else return nodes.groupNm;
  };

  const getDataIndex = (list, categroy, data) => {
    return list && list.findIndex((v) => v[categroy] === data);
  };

  const getReplaceItem = (index, list, checked) => {
    return {
      ...list[index],
      checked: checked,
    };
  };

  const getReplaceGroupItem = (index, list, children) => {
    return {
      ...list[index],
      children: children,
      checked: children.some((v) => v.checked),
    };
  };

  const reformatCheckList = useCallback(
    (handle, type, list, checked, nodes) => {
      let array = [...list];
      const category = type === 'protocolApiList' ? 'apiId' : 'valueSeq';
      const listIndex = getDataIndex(array, 'groupCode', nodes.groupCode);
      let children = [...array[listIndex].children];

      if (handle === 'item') {
        if (listIndex > -1) {
          const itemIndex = getDataIndex(children, category, nodes[category]);

          children[itemIndex] = getReplaceItem(
            itemIndex,
            children,
            !nodes.checked,
          );
          array[listIndex] = getReplaceGroupItem(listIndex, array, children);
        }
      } else if (handle === 'group') {
        if (listIndex > -1) {
          const childrenResult = children.map((item, index) => {
            return {
              ...item,
              checked: !nodes.checked,
            };
          });
          array[listIndex] = getReplaceGroupItem(
            listIndex,
            array,
            childrenResult,
          );
        }
      }
      // 자동 선택
      if (nodes.groupCode === '0002-A1011' && type !== 'protocolApiList') {
        let checkGroupCode = '0002';
        const groupCodeIdx = getDataIndex(array, 'groupCode', checkGroupCode);
        let groupCodeChildren = [...array[groupCodeIdx].children];

        if (handle === 'item') {
          let groupCodeChildren = [...array[groupCodeIdx].children];
          const listIdx = getDataIndex(
            groupCodeChildren,
            'valueSeq',
            nodes.valueSeq,
          );
          groupCodeChildren[listIdx] = getReplaceItem(
            listIdx,
            groupCodeChildren,
            !nodes.checked,
          );

          array[groupCodeIdx] = getReplaceGroupItem(
            groupCodeIdx,
            array,
            groupCodeChildren,
          );
        } else {
          const result = groupCodeChildren.map((v) => {
            const value = array[listIndex].children.find(
              (item) => item.valueSeq === v.valueSeq,
            );
            if (!isNull(value)) {
              return {
                ...v,
                checked: value.checked,
              };
            } else {
              return v;
            }
          });

          array[groupCodeIdx] = getReplaceGroupItem(
            groupCodeIdx,
            array,
            result,
          );
        }
      }
      dispatch(handleCheckLists({ type: type, list: array }));
    },
    [dispatch],
  );

  const getOnChange = useCallback(
    (checked, nodes) => {
      const { type } = nodes;

      const list =
        type === 'usedProtocolList'
          ? [...usedProtocolList.children]
          : [...unusedProtocolList.children];

      if (type === 'usedProtocolList' || type === 'unusedProtocolList') {
        // 일반기능 구현(제어) 체크
        if (isNull(nodes.valueSeq)) {
          reformatCheckList('group', type, list, checked, nodes);
        } else {
          reformatCheckList('item', type, list, checked, nodes);
        }
        // 전체
      } else {
        // if (nodes.checked) {
        //   moveUnUsedList(nodes);
        // }
        // 전체에서 체크 해제한 경우
        if (nodes.children) {
          reformatCheckList(
            'group',
            type,
            protocolApiList.children,
            checked,
            nodes,
          );
        } else {
          reformatCheckList(
            'item',
            type,
            protocolApiList.children,
            checked,
            nodes,
          );
        }

        // if (nodes.checked) {
        //   moveUnUsedList(nodes);
        // }
      }
    },
    [
      protocolApiList.children,
      usedProtocolList.children,
      unusedProtocolList.children,
      reformatCheckList,
      // moveUnUsedList,
    ],
  );

  // useEffect(() => {
  //   // if (isNull(selectedValue)) {
  //   //
  //   //   setSelectedValue(dialogInfo.devModelCode);
  //   // }
  // }, [selectedValue, dialogInfo]);
  // useEffect(() => {
  //   console.log('dialogInfo >> ', dialogInfo.devModelCode);
  //   // if (isNull(selectedValue)) {
  //   //
  //   //   setSelectedValue(dialogInfo.devModelCode);
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleCheckAll = (e, type, items) => {
    const { checked } = e.target;

    const array = [...items.children];

    const toggleArray =
      array &&
      array.map((v) => {
        return {
          ...v,
          checked: checked,
          children: v.children?.map((i, cIndex) => ({
            ...i,
            checked: checked,
          })),
        };
      });

    dispatch(handleCheckLists({ type: type, list: toggleArray }));
  };

  const TreeItemComponent = (node) => {
    return (
      <FormControlLabel
        key={node.id}
        label={<>{getLabel(node)}</>}
        control={
          <Checkbox
            checked={node.checked}
            onChange={(event) => getOnChange(event.currentTarget.checked, node)}
            onClick={(e) => e.stopPropagation()}
          />
        }
      />
    );
  };

  const protocolChangeList = (type, title, subTitle, items) => {
    return (
      <Card
        sx={{
          border: `1px solid ${theme.palette.grey[600]}`,
          borderRadius: 1,
          margin: 2,
        }}
      >
        <CTree
          sx={{
            height: 450,
            flexGrow: 1,
            maxWidth: '100%',
            overflowY: 'auto',
            maxHeight: 450,
          }}
          dividersx={{ borderBottomWidth: 1 }}
          treeDataList={items.children}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={(e) => {}}
          onNodeToggle={(e) => {}}
          headerChildren={
            <>
              <FormControlLabel
                label={title}
                checked={items.children.some((v) => v.checked)}
                control={
                  <Checkbox onChange={(e) => handleCheckAll(e, type, items)} />
                }
              />
              <Chip
                label={subTitle}
                color="info"
                sx={{ fontWeight: 600, fontSize: '12px' }}
              />
            </>
          }
          treeItemLabel={TreeItemComponent}
        />
      </Card>
    );
  };

  return (
    <CDialog open={open} onClose={onClose} maxWidth={maxWidth}>
      <CDialogTitle
        title={
          t('word.prod') + ' ' + t('word.protocol') + ' ' + t('word.change')
        }
        gridsx={{ flexDirection: 'column' }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '0.975rem' }}>
          [ {dataGridTitle} ]
        </Typography>
      </CDialogTitle>
      <Divider />
      <CDialogContent grids={[3, 12, 12]}>
        <CSlectAutocomplete
          value={selectedValue}
          label={t('word.copy') + ' ' + t('word.devModelCode')}
          getOption={'desc'}
          getValue={'devModelCode'}
          optionArray={dialogInfo.devModelCode}
          onChange={(e, newValue) => handleChange(e, newValue)}
          style={{ minWidth: 300, marginLeft: 2, p: 1 }}
        />
        <Grid container justifyContent="center" alignItems="center">
          {/* protocol API */}
          <Grid item xs={12}>
            {protocolChangeList(
              'protocolApiList',
              t('word.all'),
              '',
              protocolApiList,
            )}
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
            {/* 사용*/}
            <Grid item xs={5}>
              {protocolChangeList(
                'usedProtocolList',
                `${t('word.total')} ${t('word.select')}`,
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
                disabled={
                  !usedProtocolList.children.some((v) => v.checked) ||
                  usedProtocolList.children.length === 0
                }
                className={classes.CButton}
                aria-label="move selected right"
              >
                &gt;
              </CButton>
              <CButton
                sx={{ my: 1.5 }}
                variant="outlined"
                size="large"
                onClick={handleCheckedLeft}
                disabled={
                  !unusedProtocolList.children.some((v) => v.checked) ||
                  unusedProtocolList.children.length === 0
                }
                className={classes.CButton}
                aria-label="move selected left"
              >
                &lt;
              </CButton>
            </Grid>
            {/* 미사용 */}
            <Grid item xs={5}>
              {protocolChangeList(
                'unusedProtocolList',
                `${t('word.total')} ${t('word.select')}`,
                t('word.unused'),
                unusedProtocolList,
              )}
            </Grid>
          </Grid>
        </Grid>
      </CDialogContent>
      <CDialogActions sx={{ padding: 4 }}>
        <CButton variant="outlined" type={'cancel'} onClick={() => onClose()}>
          {t('word.cancel')}
        </CButton>
        <CButton variant="outlined" type={'save'} onClick={() => handleSave()}>
          {t('word.save')}
        </CButton>
      </CDialogActions>
    </CDialog>
  );
};

export default React.memo(ProdChangeProtocolDialog);
