import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScoreBoard from "./Pages/ScoreBoard";
import { createTheme, makeStyles, ThemeProvider } from "@mui/material";
import AdminMenu from "./Pages/AdminMenu";
import AdminMatch from "./Pages/AdminMatch";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminMatch />} />
          <Route path="/scoreboard" element={<ScoreBoard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
