import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
} from '@mui/material';
import CButton from '../../components/basic/CButton';
import SampleDialog from './CustomDialogs/SampleDialog';

const LayoutSample = () => {
  const [open, setOpen] = useState(false);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
  };

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

      <SampleDialog open={open} onClose={dialogClose}></SampleDialog>
    </Grid>
  );
};

export default LayoutSample;
