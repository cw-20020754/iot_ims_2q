import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
} from '@mui/material';
import CButton from '../../components/basic/CButton';
import CTabs from '../../components/basic/CTabs';
import CTree from '../../components/basic/CTree';
import SampleDialog from './CustomDialogs/SampleDialog';

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
            <Typography variant="h4">LayoutSample</Typography>
          </CardContent>
          <CardActions>
            <CButton
              variant="outlined"
              onClick={dialogOpen}
              text="Open dialog"
            ></CButton>
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
    </Grid>
  );
};

export default LayoutSample;
