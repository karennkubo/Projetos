import React from "react";
import { Router } from "./Routes/router";
import theme from "./Constants/theme";
import { ThemeProvider } from '@mui/material/styles';
import "./App.css";
import GlobalState from "./Global/GlobalState";

function App() {

  return (
    <>
        <GlobalState>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </GlobalState>
    </>
  )
}

export default App;
