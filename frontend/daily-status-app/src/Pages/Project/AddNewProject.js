import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import React from "react";

const AddNewProject = () => {
  return (
    < >
      <Grid container sx={{ padding: "20px 50px 10px"}}>
        <Grid xs={8}>
          <Typography variant="h4">PROJECTS</Typography>
        </Grid>
        <Grid xs={3}>
          <Button size="large" variant="contained" color="primary">
            Add New Project
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewProject;
