import React from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AddStatus = () => {
  const handleOpen = () => {};
  return (
    <div>
      <Grid container sx={{ padding: "20px 50px 10px" }}>
        <Grid xs={8}>
          <Typography variant="h4">STATUS</Typography>
        </Grid>
      </Grid>
      <div style={{ width: "300px", padding: "20px 50px 10px" }}>
        <Select options={options} placeholder="Select Project" />
      </div>
      <div>
        <Button
          onClick={handleOpen}
          size="large"
          variant="contained"
          color="primary"
        >
          UPDATE THE STATUS
        </Button>
      </div>
    </div>
  );
};

export default AddStatus;
