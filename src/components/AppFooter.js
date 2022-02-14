import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import AppStyles from "./AppStyle";
import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const AppFooter = () => {
  const classes = AppStyles();

  const { t } = useTranslation();

  return (
    <Paper elevation={3} className={classes.bottomFooter}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box component={"img"} src={logo} sx={{ width: 80, marginLeft: 5 }} />
        <Typography className={classes.copyRight}>
          &copy; {t("desc.copyright")}{" "}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default AppFooter;
