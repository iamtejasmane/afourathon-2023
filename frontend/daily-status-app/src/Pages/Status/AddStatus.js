import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { createStatus, getStatusOfUser } from "../../slice/statusSlice";
import { useUser } from "../../contexts";

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

const initialStatusState = {
  ticket_id: "",
  hours_spent: "",
  status: "",
  comments: "",
};

const AddStatus = () => {
  const [statusData, setStatusData] = useState({ ...initialStatusState });
  const {user} = useUser();

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await dispatch(
      createStatus({ ...statusData, status: statusData.status.value, empId: user.empId })
    );
    await dispatch(getStatusOfUser({ empId: user.empId }));
    setStatusData({ ...initialStatusState });
  };
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
          value={statusData.ticket_id}
          onChange={(e) =>
            setStatusData((prev) => ({ ...prev, ticket_id: e.target.value }))
          }
        />
        <TextField
          style={{ width: "200px" }}
          label="Hours Spent"
          type="Number"
          value={statusData.hours_spent}
          onChange={(e) =>
            setStatusData((prev) => ({ ...prev, hours_spent: e.target.value }))
          }
        />
        <div style={{ width: "250px" }}>
          <Select
            styles={customStyles}
            options={options}
            placeholder="Status... "
            onChange={(value) =>
              setStatusData((prev) => ({ ...prev, status: value }))
            }
          />
        </div>

        <TextField
          style={{ width: "400px" }}
          label="Comment"
          value={statusData.comments}
          onChange={(e) =>
            setStatusData((prev) => ({ ...prev, comments: e.target.value }))
          }
        />
        <div>
          <Button
            onClick={handleSubmit}
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
