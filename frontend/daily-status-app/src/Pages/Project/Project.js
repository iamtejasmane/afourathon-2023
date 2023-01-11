import React from "react";
import { useSelector } from "react-redux";
import UpdateProjectForm from "../../Components/UpdateProjectForm";
import AddNewProject from "./AddNewProject";
import ProjectList from "./ProjectList";
import { CircularProgress } from "@mui/material";
import SnackBar from "../../Components/SnackBar";

const Project = () => {
  const { loading, snackStatus } = useSelector((store) => store.project);

  return (
    <div>
      <SnackBar value={snackStatus.value} error={snackStatus.error} />
      <AddNewProject />
      {loading === false ? <ProjectList /> : <CircularProgress />}
      <UpdateProjectForm />
    </div>
  );
};

export default Project;
