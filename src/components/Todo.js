import Box from "@mui/material/Box";
import React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useTodos } from "../contexts/TaskContext";
import { useContext } from "react";
import { useState } from "react";
import "../App.css";
import "../ToDoStyle.css";
// Dailog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useSnack } from "../contexts/SnackContext";

// Dailog //

export default function Todo({ todo, handleDelete, handleEdit }) {
  // =============== //
  let openToast = useSnack();
  const { todos, dispatch } = useTodos();
  function handleDoneClick() {
    dispatch({ type: "checked", payload: todo });
    if (!todo.isCompleted) {
      openToast("! مبارك على انجاز المهمة", "success");
    }
  }

  //

  return (
    <>
      <Card
        className="taskCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginBottom: "15px",
          marginTop: 5,
        }}
      >
        <CardContent sx={{ marginTop: 2 }}>
          <Grid
            className="card-content"
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Grid xs={8} className="title-task" sx={{ textAlign: "right" }}>
              <Typography
                variant="h5"
                sx={{
                  textWrap: "wrap",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  textDecorationThickness: 3,
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "normal",
                  textWrap: "wrap",
                  wordWrap: "break-word",
                }}
                variant="h6"
              >
                {todo.body}
              </Typography>
            </Grid>
            <Grid
              className="icons"
              xs={4}
              display="flex"
              flexDirection="row-reverse"
              justifyContent="space-around"
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <IconButton
                className="iconBtn"
                onClick={() => handleDelete(todo)}
                color="primary"
                sx={{
                  border: "2px solid #d32f2f",
                  backgroundColor: "white",
                }}
              >
                <DeleteForeverIcon className="iconShape" />
              </IconButton>
              <IconButton
                className="iconBtn"
                onClick={() => handleEdit(todo)}
                sx={{
                  color: "#1769aa",
                  border: "2px solid #1769aa",
                  background: "white",
                }}
              >
                <EditIcon className="iconShape" />
              </IconButton>
              <IconButton
                className="iconBtn"
                sx={{
                  color: todo.isCompleted ? "white" : "green",
                  border: "2px solid green",
                  backgroundColor: todo.isCompleted ? "green" : "white",
                }}
                onClick={() => handleDoneClick()}
              >
                <DoneIcon className="iconShape" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>

      </CardActions> */}
      </Card>
    </>
  );
}
