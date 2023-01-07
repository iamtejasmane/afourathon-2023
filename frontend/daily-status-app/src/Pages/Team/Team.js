import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UpdateTeamForm from "../../Components/UpdateTeamForm";
import AddNewTeam from "./AddNewTeam";

const Team = () => {
  const { loading, error } = useSelector((store) => store.teams);
  return (
    <div>
      <AddNewTeam />
      <UpdateTeamForm />
    </div>
  );
};

export default Team;
