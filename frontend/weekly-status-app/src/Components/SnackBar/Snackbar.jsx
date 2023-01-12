import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { projectAction } from "../../slice/projectSlice";
import { statusAction } from "../../slice/statusSlice";
import { teamsActions } from "../../slice/teamSlice";

const Snackbaar = ({ value, error }) => {
  console.log(value, error)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value !== null && error !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value, error]);

  const handleClose = () => {
    setOpen(false);
    dispatch(projectAction.setSnackStatus());
    dispatch(statusAction.setSnackStatus());
    dispatch(teamsActions.setSnackStatus());
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}

        action={
          <IconButton onClick={handleClose} sx={{ color: "#000" }}>
            &times;
          </IconButton>
        }
      >
        <Alert
         sx={{ width: '250px' }}
          severity={error === true ? "error" : "success"}
        >
          {value}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Snackbaar;
