import React from "react";
import { Box, Typography } from "@mui/material";
import fotaStyles from "./FotaStyle";

const FotaHistory = () => {
  const classes = fotaStyles();

  return (
    <Box className={classes.root}>
      <Typography>FotaHistory</Typography>
    </Box>
  );
};

export default FotaHistory;
