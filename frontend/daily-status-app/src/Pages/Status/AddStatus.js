import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import { Box } from "@mui/system";

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

const AddStatus = () => {
  const handleOpen = () => {};
  return (
    <div>
      <Grid container sx={{ padding: "20px 50px 10px" }}>
        <Grid xs={8}>
          <Typography variant="h4">STATUS</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          padding: "20px 50px 10px",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <TextField
          style={{ width: "200px" }}
          label="Ticket Id"
          type="Text"
          // value={state.team_name}
          // onChange={}
        />
        <TextField
          style={{ width: "200px" }}
          label="Hours Spent"
          type="Number"
          // value={state.team_name}
          // onChange={}
        />
        <div style={{ width: "250px" }}>
          <Select
            styles={customStyles}
            options={options}
            placeholder="Status... "
          />
        </div>

        <TextField
          style={{ width: "400px" }}
          label="Comment"
          // value={state.team_name}
          // onChange={}
        />
        <div>
          <Button
            onClick={handleOpen}
            size="large"
            sx={{ height: "52px" }}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddStatus;
