import "./App.css";
import Button from "@mui/material/Button";
import ToDoList from "./components/ToDoList";
import { createTheme, Snackbar, ThemeProvider } from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Routes, Route } from "react-router-dom";

import { SnackProvider } from "./contexts/SnackContext";
import { TaskProvider } from "./contexts/TaskContext";
function App() {
  const [todos, setTodos] = useState([]);
  const theme = createTheme({
    typography: {
      fontFamily: ["tajwal"],
    },
    palette: {
      primary: {
        main: "#d32f2f",
      },
    },
  });

  return (
    <TaskProvider>
      <div>
        <SnackProvider>
          <ThemeProvider theme={theme}>
            <div
              className="App"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#191b1f",
                // minHeight: "100vh",
                height: "100vh",
                direction: "rtl",
              }}
            >
              <ToDoList />
            </div>
          </ThemeProvider>
        </SnackProvider>
      </div>
    </TaskProvider>
  );
}

export default App;
