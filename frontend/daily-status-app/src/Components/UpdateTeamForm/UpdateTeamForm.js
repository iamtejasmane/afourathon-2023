import React, { useEffect, useReducer, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, FormControl, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import Select from "react-select";
import {
  createNewProject,
  getAllProject,
  projectAction,
  updateProject,
} from "../../slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeamsForProject,
  teamsActions,
  updateTeam,
} from "../../slice/teamSlice";

const options = [
  { value: "admin@admin.com", label: "admin@admin.com", empId: "2" },
  { value: "manager", label: "manager@admin.com", empId: "7" },
  { value: "cto@admin.com", label: "CTO@admin.com", empId: "6" },
];

const initialState = {
  team_name: "",
  team_start_dt: Date.parse(new Date()),
  team_end_dt: Date.parse(new Date()),
  team_lead_name: "",
  team_lead_email: "",
  team_members_emp_id_list: [],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECT_NAME": {
      return {
        ...state,
        team_name: action.payload,
      };
    }
    case "SET_PROJECT_START_DATE": {
      return {
        ...state,
        team_start_dt: action.payload,
      };
    }
    case "SET_PROJECT_END_DATE": {
      return {
        ...state,
        team_end_dt: action.payload,
      };
    }
    case "SET_MANAGER_NAME": {
      return {
        ...state,
        team_lead_name: action.payload,
      };
    }
    case "SET_MANAGER_MAIL": {
      return {
        ...state,
        team_lead_email: action.payload,
      };
    }
    case "SET_MAILING_LIST": {
      return {
        ...state,
        team_members_emp_id_list: [18],
      };
    }
    case "SET_NEW_STATE": {
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

const UpdateTeamForm = () => {
  const reduxDispatch = useDispatch();
  const { selectedProjectForTeam, openTeamsModal, selectedTeam } = useSelector(
    (store) => store.teams
  );

  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_NEW_STATE", payload: { ...selectedTeam } });
    return () =>
      dispatch({ type: "SET_NEW_STATE", payload: { ...initialState } });
  }, [selectedTeam]);

  const handleClose = () => {
    reduxDispatch(teamsActions.setCloseTeamModal());
    reduxDispatch(teamsActions.unSetTeam());
  };

  const handleClick = async () => {
    await reduxDispatch(
      updateTeam({
        ...state,
        teamId: selectedTeam.team_id,
        projectId: selectedProjectForTeam.project_id,
      })
    );
    await reduxDispatch(
      getTeamsForProject({
        project_id: selectedProjectForTeam.project_id,
        empId: 2,
      })
    );
    handleClose();
  };

  return (
    <Dialog
      fullScreen={false}
      onClose={handleClose}
      open={openTeamsModal}
      sx={{ zIndex: "1800", position: "absolute" }}
    >
      <DialogTitle>Update Team</DialogTitle>
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
            value={state.team_name}
            onChange={(e) => {
              dispatch({ type: "SET_PROJECT_NAME", payload: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={new Date(state.team_start_dt)}
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
              value={new Date(state.team_end_dt)}
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
            value={state.team_lead_name}
            onChange={(e) =>
              dispatch({ type: "SET_MANAGER_NAME", payload: e.target.value })
            }
          />
          <TextField
            label="Manager Email"
            type={"email"}
            style={{ width: "30ch" }}
            value={state.team_lead_email}
            onChange={(e) =>
              dispatch({ type: "SET_MANAGER_MAIL", payload: e.target.value })
            }
          />
          <Select
            style={{ minWidth: "25ch" }}
            placeholder="Team Members"
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
            Update{" "}
          </Button>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default React.memo(UpdateTeamForm);
