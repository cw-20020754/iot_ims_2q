import React, { Suspense } from "react";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import theme from "./assets/theme/theme";
import Routes from "./router";

const App = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <ThemeProvider theme={theme}>
        {/*<Snackbar*/}
        {/*  open={true}*/}
        {/*  autoHideDuration={6000}*/}
        {/*  anchorOrigin={{ vertical: "top", horizontal: "center" }}*/}
        {/*>*/}
        {/*  <Alert severity="info" sx={{ width: "100%" }}>*/}
        {/*    This is a success message!*/}
        {/*  </Alert>*/}
        {/*</Snackbar>*/}
        <Routes />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
