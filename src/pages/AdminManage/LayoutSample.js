import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  IconButton,
  Box,
} from '@mui/material';
import CButton from '../../components/basic/CButton';
import CTabs from '../../components/basic/CTabs';
import CTree from '../../components/basic/CTree';
import SampleDialog from './CustomDialogs/SampleDialog';
import GridViewIcon from '@mui/icons-material/GridView';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LayoutSample = () => {
  const [open, setOpen] = useState(false);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  const tabDataList = [
    { value: '0001', label: '연결' },
    { value: '0002', label: '일반기능 구현' },
    { value: '0003', label: '센서기능 구현' },
    { value: '0004', label: '에러' },
    { value: '0005', label: '파라미터 변경' },
    { value: '0006', label: 'FOTA' },
    { value: '0007', label: '인증만료' },
    { value: '0008', label: '스마트진단(상시)' },
    { value: '0009', label: '스마트진단(정밀)' },
    { value: '0010', label: '제품 데이터 동기화' },
    { value: '0011', label: '부가정보요청' },
  ];

  const onNodeSelect = (event, nodeIds) => {
    // console.log(nodeIds);
  };

  const onNodeButtonClick = (type, id) => {
    // console.log('type = ', type);
    // console.log('id = ', id);
  };

  const treeDataList = [
    {
      id: '001',
      labelText: '그룹1',
      labelInfo: 2,
      prependIcon: GridViewIcon,
      appendIconButtons: [
        {
          type: 'edit',
          icon: EditIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
        {
          type: 'delete',
          icon: DeleteIcon,
          onNodeButtonClick: onNodeButtonClick,
          disabled: true,
        },
      ],
      children: [
        {
          id: '001.1',
          labelText: 'item1',
          labelInfo: 'ko',
          prependIcon: ArticleIcon,
        },
        {
          id: '001.2',
          labelText: 'item2',
          labelInfo: 'ko',
          prependIcon: ArticleIcon,
        },
      ],
    },
    {
      id: '002',
      labelText: '그룹2',
      labelInfo: 0,
      prependIcon: GridViewIcon,
      appendIconButtons: [
        {
          type: 'edit',
          icon: EditIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
        {
          type: 'delete',
          icon: DeleteIcon,
          onNodeButtonClick: onNodeButtonClick,
        },
      ],
    },
  ];

  const env = process.env.NODE_ENV;

  return (
    <Grid
      container
      direction="row"
      rowSpacing={1}
      columnSpacing={1}
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography variant="h4">{env}</Typography>
          </CardContent>
          <CardActions>
            <CButton variant="outlined" onClick={dialogOpen}>
              Open dialog
            </CButton>
          </CardActions>
        </Card>
      </Grid>

      <Grid
        item
        xs={4}
        container
        direction="column"
        rowSpacing={1}
        columnSpacing={1}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h4">LayoutSample2</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h4">LayoutSample3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CTabs tabDataList={tabDataList}>
          {/* tabDataList index에 맞게 component 추가 (children으로 render) */}
          <Typography variant="h4">panel1</Typography>
          <Typography variant="h4">panel2</Typography>
        </CTabs>
      </Grid>
      <SampleDialog open={open} onClose={dialogClose}></SampleDialog>

      <Grid item xs={4}>
        <CTree
          treeDataList={treeDataList}
          onNodeSelect={onNodeSelect}
          defaultExpanded={[treeDataList[0].id]}
          headerChildren={
            <>
              <IconButton>
                <EditIcon />
              </IconButton>
              <CButton variant="outlined">그룹 추가</CButton>
            </>
          }
        ></CTree>
      </Grid>
      <SampleDialog open={open} onClose={dialogClose}></SampleDialog>
    </Grid>
  );
};

export default LayoutSample;
