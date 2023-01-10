import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import AddProjectForm from "../../Components/AddProjectForm";
import {createNewProject} from '../../slice/projectSlice'

const AddNewProject = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = ()=>{
    setOpen(true);
  }
  return (
    < >
      <Grid container sx={{ padding: "20px 50px 10px"}}>
        <Grid xs={8}>
          <Typography variant="h4">PROJECTS</Typography>
        </Grid>
        <Grid xs={3}>
          <Button onClick={handleOpen} size="large" variant="contained" color="primary">
            Add New Project
          </Button>
          <AddProjectForm open={open} setOpen={setOpen}/>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewProject;
