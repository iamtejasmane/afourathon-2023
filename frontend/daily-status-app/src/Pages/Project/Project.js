import React from "react";
import { useSelector } from "react-redux";
import UpdateProjectForm from "../../Components/UpdateProjectForm";
import AddNewProject from "./AddNewProject";
import ProjectList from "./ProjectList";
import { CircularProgress } from "@mui/material";

const Project = () => {
  const { loading } = useSelector((store) => store.project);
  return (
    <div>
      <AddNewProject />
      {loading === false ? <ProjectList /> : <CircularProgress />}
      <UpdateProjectForm />
    </div>
  );
};

export default Project;
