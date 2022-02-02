import React from 'react';
import './App.css';
import TopBar from "./Components/Navigation/TopBar";
import MainRouter from "./Components/Navigation/Routers/MainRouter";
import {
    BrowserRouter as Router,
} from "react-router-dom"
import {Box} from "@mui/material";

function App() {
  return <Router>
          <>
              <TopBar />
              <Box sx={{m:2}}>
                  <MainRouter />
              </Box>
          </>
      </Router>
}

export default App;
