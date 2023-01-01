import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AddProjectForm = ({ open, setOpen }) => {
  return (
    <Dialog
      fullScreen={false}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ zIndex: "1800", position: "absolute" }}
    >
      <DialogTitle>Add New Project</DialogTitle>
      <Box sx={{ margin: "1rem 7rem 1rem", height: "600px" }}>
        <FormControl
          sx={{
            width: "30ch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField style={{ width: "30ch" }} label="Project Name" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              // value={value}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              // value={value}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField style={{ width: "30ch" }} label="Manager Name" />
          <TextField label="Manager Email" style={{ width: "30ch" }} />
          <Select
            style={{ width: "25ch" }}
            placeholder="Daily Status Report Mailing List"
            options={options}
            isMulti={true}
          />
          <Button sx={{width: "250px", marginTop: "30px"}} size="large" variant="contained">
            Create{" "}
          </Button>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default AddProjectForm;
