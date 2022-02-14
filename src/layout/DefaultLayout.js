import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/Sidebar/AppSidebar";
import AppContent from "../components/AppContent";
import AppFooter from "../components/AppFooter";

const DefaultLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppHeader />
      <AppSidebar />
      {/* main */}
      <AppContent />
      <AppFooter />
    </Box>
  );
};

export default DefaultLayout;
