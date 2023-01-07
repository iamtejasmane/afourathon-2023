import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  createStatus,
  getStatusOfUser,
  statusAction,
  statusSlice,
} from "../../slice/statusSlice";
import { useUser } from "../../contexts";
import ProjectSelector from "./ProjectSelector";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 55,
    minHeight: 35,
  }),
};
// In Progress/Blocked/Completed/PTO/In Review
const options = [
  { value: "In Progress", label: "In Progress" },
  { value: "Blocked", label: "Blocked" },
  { value: "Completed", label: "Completed" },
  { value: "PTO", label: "PTO" },
  { value: "In Review", label: "In Review" },
];

const initialStatusState = {
  ticket_id: "",
  hours_spent: "",
  status: "",
  comments: "",
};

const AddStatus = () => {
  const [statusData, setStatusData] = useState({ ...initialStatusState });
  const { user } = useUser();

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(statusAction.setStatusEditModal());
  };

  return (
    <div>
      <Grid container sx={{ padding: "20px 50px 10px" }}>
        <Grid xs={7}>
          <Typography variant="h4">STATUS</Typography>
        </Grid>
        <Grid xs={3}>
          <ProjectSelector />
        </Grid>
        <Grid xs={2}>
          <Button size="large" variant="contained" onClick={handleSubmit}>
            Add new Status
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddStatus;
