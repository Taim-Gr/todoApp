import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SnackContext } from "../contexts/SnackContext";
import { useContext } from "react";
import Alert from "@mui/material/Alert";
export default function MySnackbar({ open, text, type }) {
  return (
    <div dir="ltr">
      <Snackbar open={open} autoHideDuration={6000} sx={{ background: "" }}>
        <Alert variant="filled" severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
