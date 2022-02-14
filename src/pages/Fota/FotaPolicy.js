import React from "react";
import { Box, Typography } from "@mui/material";
import fotaStyles from "./FotaStyle";

const FotaPolicy = () => {
  const classes = fotaStyles();

  return (
    <Box className={classes.root}>
      <Typography>FotaPolicy</Typography>
    </Box>
  );
};

export default FotaPolicy;
