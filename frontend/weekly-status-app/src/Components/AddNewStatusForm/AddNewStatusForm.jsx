import React, { useEffect, useReducer, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, FormControl, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  createStatus,
  statusAction,
  getStatusOfUser,
  updateStatus,
} from "../../slice/statusSlice";
import { isEmpty } from "lodash";
const initialState = {
  highligth: "",
  date: Date.parse(new Date()),
  risk: "",
  status: "",
};

const reducerFun = (state, action) => {
  switch (action.type) {
    case "SET_STATUS": {
      return {
        ...state,
        status: action.payload,
      };
    }
    case "SET_DATE": {
      return {
        ...state,
        date: action.payload,
      };
    }
    case "SET_RISK": {
      return {
        ...state,
        risk: action.payload,
      };
    }
    case "SET_HIGHLIGHT": {
      return {
        ...state,
        highligth: action.payload,
      };
    }
    case "SET_NEW_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AddNewStatusForm = ({ isForUpdate }) => {
  const [open, setOpen] = useState(false);
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducerFun, initialState);
  const {
    selectedStatusToEdit,
    isOpenEditStatusModal,
    selectedProjectForStatusUpdate,
  } = useSelector((store) => store.status);

  useEffect(() => {
    if (isOpenEditStatusModal === true) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpenEditStatusModal]);

  useEffect(() => {
    if (!isEmpty(selectedStatusToEdit)) {
      dispatch({ type: "SET_NEW_DATA", payload: { ...selectedStatusToEdit } });
    }

    return () =>
      dispatch({ type: "SET_NEW_DATA", payload: { ...initialState } });
  }, [selectedStatusToEdit]);

  const handleClose =  () => {
    setOpen(false);
    reduxDispatch(statusAction.unSetStatusEditModal());
    reduxDispatch(statusAction.unSetStatusForEdit());
  };

  const handleClick = async () => {
    handleClose()
    await reduxDispatch(
      createStatus({
        ...state,
        project_id: selectedProjectForStatusUpdate.project_id,
      })
    );
    await reduxDispatch(
      getStatusOfUser({ project_id: selectedProjectForStatusUpdate.project_id })
    );
  };

  const handleUpdate = async () => {
    handleClose()
    await reduxDispatch(
      updateStatus({
        ...state,
      })
    );
    await reduxDispatch(
      getStatusOfUser({ project_id: selectedProjectForStatusUpdate.project_id })
    );
  };
  return (
    <div>
      <Dialog
        fullScreen={false}
        onClose={handleClose}
        open={open}
        sx={{ zIndex: "1800", position: "absolute" }}
      >
        <DialogTitle>Add New Status</DialogTitle>
        <Box sx={{ margin: "1rem 7rem 1rem", height: "450px" }}>
          <FormControl
            sx={{
              width: "30ch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              style={{ width: "270px" }}
              label="Status"
              value={state.status}
              onChange={(e) => {
                dispatch({ type: "SET_STATUS", payload: e.target.value });
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Week Ending Date"
                value={new Date(state.date)}
                onChange={(newValue) => {
                  dispatch({
                    type: "SET_DATE",
                    payload: Date.parse(newValue),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              style={{ width: "270px" }}
              label="Highlights"
              value={state.highligth}
              onChange={(e) =>
                dispatch({ type: "SET_HIGHLIGHT", payload: e.target.value })
              }
            />
            <TextField
              label="Risk"
              style={{ width: "270px" }}
              value={state.risk}
              onChange={(e) =>
                dispatch({ type: "SET_RISK", payload: e.target.value })
              }
            />
            {isEmpty(selectedStatusToEdit) ? (
              <Button
                sx={{ width: "270px", marginTop: "30px" }}
                size="large"
                variant="contained"
                onClick={handleClick}
              >
                Create
              </Button>
            ) : (
              <Button
                sx={{ width: "270px", marginTop: "30px" }}
                size="large"
                variant="contained"
                onClick={handleUpdate}
              >
                Update
              </Button>
            )}
          </FormControl>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddNewStatusForm;
