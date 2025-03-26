import Container from "@mui/material/Container";

import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect, useMemo, useReducer } from "react";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import { useTodos } from "../contexts/TaskContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

// Dailog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React from "react";
import { useSnack } from "../contexts/SnackContext";
import todoReduce from "../reduces/todoReduce";
// Dailog //
// Others :
// if (localStorage.getItem("todos")) {
//   const storageTodos = JSON.parse(localStorage.getItem("todos"));
//   setTodos(storageTodos);
// }
export default function ToDoList() {
  const { todos, dispatch } = useTodos();
  const [dailogTodo, setDailogTodo] = useState("");
  // ==== Snack Bar ==== //
  let openToast = useSnack();
  // ==== Snack Bar ==== //
  const [task, setTask] = useState("");
  // const [showTimingPage, setShowTimingPage] = useState(false);
  // let { todos2, setTodos } = useContext(TaskContext);

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed todos");
      return t.isCompleted;
    });
  }, [todos]);
  const unCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling not completed todos");
      return !t.isCompleted;
    });
  }, [todos]);
  let todosToBeRender = todos;
  if (displayedTodosType === "completed") {
    todosToBeRender = completedTodos;
  } else if (displayedTodosType === "unCompleted") {
    todosToBeRender = unCompletedTodos;
  } else {
    todosToBeRender = todos;
  }
  // ==== Edit ==== //
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = (t) => {
    console.log(t);
    setDailogTodo(t);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleEdit() {
    dispatch({ type: "updated", payload: dailogTodo });
    handleCloseEdit();
    openToast("تم تعديل المهمة بنجاح", "success");
  }
  // ==== Edit ==== //
  // Dailog Delete

  const handleClickOpenDelete = (t) => {
    setDailogTodo(t);
    setOpenDelete(true);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // todos
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  function handleDeleteClick() {
    dispatch({ type: "deleted", payload: dailogTodo.id });
    setOpenDelete(false);
    openToast("تم حذف المهمة بنجاح", "error");
  }
  // Dailog Delete

  let todosList = todosToBeRender.map((todo) => {
    return (
      <Todo
        handleDelete={handleClickOpenDelete}
        todo={todo}
        key={todo.id}
        handleEdit={handleClickOpenEdit}
      />
    );
  });
  // todos

  function addNewTask() {
    if (task === "") {
      openToast("! حقا افعل شيئاً ", "warning");
    } else {
      dispatch({
        type: "added",
        payload: {
          newTitle: task,
        },
      });
      setTask("");
      openToast("! تمت اضافة المهمة بنجاح", "success");
    }
  }

  useEffect(() => {
    dispatch({ type: "loaded" });
  }, []);
  // First render = [] ==? Second render = []
  // => Nothing Changed
  function changeDisplayedTodosType(event) {
    setDisplayedTodosType(event.target.value);
  }
  // Completed Et UnCompleted :

  return (
    <>
      <React.Fragment>
        <Dialog
          dir="rtl"
          open={openEdit}
          onClose={handleCloseEdit}
          style={{ width: "100% !important" }}
        >
          <DialogTitle>تعديل المهمة :</DialogTitle>
          <DialogContent>
            <DialogContentText>عدل على مهمتك الحالية !</DialogContentText>
            <TextField
              autoFocus
              required
              sx={{ margin: "10px 0" }}
              id="name"
              name="email"
              label="عنوان المهمة"
              type="text"
              variant="standard"
              multiline
              value={dailogTodo.title}
              fullWidth
              onChange={(event) =>
                setDailogTodo({ ...dailogTodo, title: event.target.value })
              }
            />
            <TextField
              autoFocus
              required
              id="name"
              name="email"
              label="تفاصيل المهمة"
              type="text"
              variant="standard"
              multiline
              fullWidth
              value={dailogTodo.body}
              onChange={(event) =>
                setDailogTodo({ ...dailogTodo, body: event.target.value })
              }
            />
          </DialogContent>
          <DialogActions dir="ltr">
            <Button onClick={handleCloseEdit}>لست متأكد</Button>
            <Button type="submit" onClick={handleEdit}>
              !سأفعلها
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          style={{ display: openDelete ? "block" : "none" }}
          open={openDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"تأكيد حذف المهمة"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              هل انت متأكد أنك تريد حذف المهمة ؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>لا</Button>
            <Button onClick={handleDeleteClick}>نعم , أوافق</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Container maxWidth="sm" sx={{ padding: "15px" }}>
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography
              variant="h2"
              sx={{ fontFamily: "tajwal", fontWeight: "bold" }}
            >
              مهامي
            </Typography>
            <Divider />

            <ToggleButtonGroup
              aria-label="text alignment"
              exclusive
              style={{ marginTop: "20px" }}
              dir="ltr"
              value={displayedTodosType}
              onChange={changeDisplayedTodosType}
              color="primary"
            >
              <ToggleButton value="unCompleted" aria-label="right aligned">
                غير المنجز
              </ToggleButton>
              <ToggleButton
                value="completed"
                aria-label="centered"
                // onClick={getCompletedTasks}
              >
                المنجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="left aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>
            {todosList}

            <Grid
              container
              alignItems="stretch"
              padding={2}
              justifyContent="space-around"
            >
              <Grid xs={8} style={{ width: "calc(100% - 10px)" }}>
                <TextField
                  multiline
                  sx={{ textAlign: "right !important" }}
                  variant="filled"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                  label="عنوان المهمة"
                  aria-labelledby="right"
                  fullWidth
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{ width: "calc(100% - 10px)", height: "100%" }}
                  variant="contained"
                  onClick={addNewTask}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            <a
              rel="noreferrer"
              href="https://github.com/Taim-Gr"
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                className="myName"
                variant="h6"
                style={{
                  width: "fit-content",
                  margin: "auto",
                  background:
                    "linear-gradient(to left,rgb(191, 63, 80), rgb(207, 111, 196) 100%)",
                  backgroundPosition: "0 100%",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "repeat-x",
                }}
              >
                Created By Taim'Jr
              </Typography>
            </a>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
