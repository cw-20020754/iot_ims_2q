import React from "react";
import { makeStyles } from "@mui/styles";
import colors from "../assets/scss/_themes-vars.module.scss";

const color = colors;

const AppStyles = makeStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: 100,
    height: 48,
  },
  bottomFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    height: 50,
  },
  copyRight: {
    fontStyle: "italic",
    padding: "20px",
    color: color.grey700,
  },
  accordionHeader: {
    borderLeftStyle: "solid",
    borderLeftWidth: "8px",
    borderLeftColor: color.primaryMain,
    borderRadius: "4px",
    boxShadow: 3,
  },
});

export default AppStyles;
