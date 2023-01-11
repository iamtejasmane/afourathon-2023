import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SnackBar from "../../Components/SnackBar";
import UpdateTeamForm from "../../Components/UpdateTeamForm";
import AddNewTeam from "./AddNewTeam";

const Team = () => {
  const { snackStatus } = useSelector((store) => store.teams);
  return (
    <div>
      <SnackBar value={snackStatus.value} error={snackStatus.error} />
      <AddNewTeam />
      <UpdateTeamForm />
    </div>
  );
};

export default Team;
