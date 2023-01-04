import React, { useReducer } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, FormControl, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import Select from "react-select";
import { createNewProject, getAllProject } from "../../slice/projectSlice";
import { useDispatch } from "react-redux";

const options = [
  { value: "admin@admin.com", label: "admin@admin.com", empId: "10" },
  { value: "manager", label: "manager@admin.com", empId: "7" },
  { value: "cto@admin.com", label: "CTO@admin.com", empId: "6" },
];

const intialState = {
  project_name: "",
  project_start_dt: Date.parse(new Date()),
  project_end_dt: Date.parse(new Date()),
  project_manager_name: "",
  project_manager_email: "",
  project_mailing_list: [],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECT_NAME": {
      return {
        ...state,
        project_name: action.payload,
      };
    }
    case "SET_PROJECT_START_DATE": {
      return {
        ...state,
        project_start_dt: action.payload,
      };
    }
    case "SET_PROJECT_END_DATE": {
      return {
        ...state,
        project_end_dt: action.payload,
      };
    }
    case "SET_MANAGER_NAME": {
      return {
        ...state,
        project_manager_name: action.payload,
      };
    }
    case "SET_MANAGER_MAIL": {
      return {
        ...state,
        project_manager_email: action.payload,
      };
    }
    case "SET_MAILING_LIST": {
      return {
        ...state,
        project_mailing_list: action.payload.map((item) => item.value),
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AddProjectForm = ({ open, setOpen }) => {
  const reduxDispatch = useDispatch();

  const [state, dispatch] = useReducer(formReducer, intialState);

  const handleClick = async () => {
    await reduxDispatch(createNewProject({ ...state, empId: 10 }));
    await reduxDispatch(getAllProject({ empId: 10 }));
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={false}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ zIndex: "1800", position: "absolute" }}
    >
      <DialogTitle>Add New Project</DialogTitle>
      <Box sx={{ margin: "1rem 7rem 1rem", height: "600px" }}>
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
            style={{ width: "30ch" }}
            label="Project Name"
            value={state.project_name}
            onChange={(e) => {
              dispatch({ type: "SET_PROJECT_NAME", payload: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={new Date(state.project_start_dt)}
              onChange={(newValue) => {
                dispatch({
                  type: "SET_PROJECT_START_DATE",
                  payload: Date.parse(newValue),
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={new Date(state.project_end_dt)}
              onChange={(newValue) => {
                dispatch({
                  type: "SET_PROJECT_END_DATE",
                  payload: Date.parse(newValue),
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            style={{ width: "30ch" }}
            label="Manager Name"
            value={state.project_manager_name}
            onChange={(e) =>
              dispatch({ type: "SET_MANAGER_NAME", payload: e.target.value })
            }
          />
          <TextField
            label="Manager Email"
            type={"email"}
            style={{ width: "30ch" }}
            value={state.project_manager_email}
            onChange={(e) =>
              dispatch({ type: "SET_MANAGER_MAIL", payload: e.target.value })
            }
          />
          <Select
            style={{ minWidth: "25ch" }}
            placeholder="Daily Status Report Mailing List"
            options={options}
            isMulti={true}
            onChange={(e) => {
              dispatch({ type: "SET_MAILING_LIST", payload: e });
            }}
          />
          <Button
            sx={{ width: "250px", marginTop: "30px" }}
            size="large"
            variant="contained"
            onClick={handleClick}
          >
            Create{" "}
          </Button>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default React.memo(AddProjectForm);