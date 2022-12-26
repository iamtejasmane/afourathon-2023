import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { FormControl, Grid, OutlinedInput, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";

const AddProjectForm = ({ open, setOpen }) => {
  return (
    <Dialog
      fullScreen={true}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ zIndex: "1500", padding: "100px 400px", position: "absolute" }}
    >
      <DialogTitle>Add New Project</DialogTitle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 15
        }}
        
      >
        <FormControl sx={{ width: "25ch" }}>
          <TextField sx={{ width: 500 }} label="Project Name" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ width: 500 }}
              label="Start Date"
              // value={value}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              sx={{ width: 500 }}
              label="End Date"
              // value={value}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField sx={{ width: 500 }} label="Manager Name" />
          <TextField sx={{ width: 500 }} label="Manager Email" />
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default AddProjectForm;
