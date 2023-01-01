import React from 'react'
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const AddNewTeam = () => {
  const handleOpen = ()=>{
    
  }
  return (
    <div><Grid container sx={{ padding: "20px 50px 10px"}}>
    <Grid xs={8}>
      <Typography variant="h4">TEAMS</Typography>
    </Grid>
    <Grid xs={3}>
      <Button onClick={handleOpen} size="large" variant="contained" color="primary">
        Create New Team
      </Button>
      {/* <AddProjectForm open={open} setOpen={setOpen}/> */}
    </Grid>
  </Grid></div>
  )
}

export default AddNewTeam