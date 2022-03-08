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

const ComCodeMgmt = () => {
  const [open, setOpen] = useState(false);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
  };

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

  return (
    <Grid
      container
      direction="row"
      columnSpacing={1}
      justifyContent="center"
      alignItems="stretch"
      maxHeight="inherit"
    >
      <Grid item xs={4}>
        <CTree
          sx={{ height: '100%' }}
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
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography variant="h4">LayoutSample3</Typography>
          </CardContent>
        </Card>
      </Grid>
      <SampleDialog open={open} onClose={dialogClose}></SampleDialog>
    </Grid>
  );
};

export default ComCodeMgmt;
