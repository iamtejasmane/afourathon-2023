import { Button, Dialog, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useUser } from "../../contexts";
import {
  statusAction,
  updateStatus,
  getStatusOfUser,
} from "../../slice/statusSlice";
const customStyles = {
  control: (base) => ({
    ...base,
    height: 55,
    minHeight: 35,
  }),
};

const options = [
  { value: "In Progress", label: "In Progress" },
  { value: "Blocked", label: "Blocked" },
  { value: "Completed", label: "Completed" },
  { value: "PTO", label: "PTO" },
  { value: "In Review", label: "In Review" },
];

const EditStatusModal = () => {
  const dispatch = useDispatch();
  const { selectedStatusToEdit, isOpenEditStatusModal } = useSelector(
    (store) => store.status
  );
  const {user} = useUser();

  const handleClose = async () => {
    dispatch(statusAction.unSetStatusEditModal());
    dispatch(statusAction.unSetStatusForEdit());
    await dispatch(getStatusOfUser({ empId: user.empId }));
  };

  const handleSubmit = async () => {
    dispatch(statusAction.unSetStatusEditModal());
    dispatch(statusAction.unSetStatusForEdit());
    await dispatch(updateStatus({ ...selectedStatusToEdit }));
    await dispatch(getStatusOfUser({ empId: user.empId }));
  };
  return (
    <Dialog
      fullScreen={false}
      onClose={handleClose}
      open={isOpenEditStatusModal}
      sx={{ zIndex: "1800", position: "absolute" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "50px",
        }}
      >
        <TextField
          style={{ width: "250px" }}
          label="Ticket Id"
          type="Text"
        //   disabled={true}
          value={selectedStatusToEdit.ticket_id}
          onChange={(e) =>
            dispatch(statusAction.updateStatus({ticket_id: e.target.value}))
          }
        />
        <TextField
          style={{ width: "250px" }}
          label="Hours Spent"
          type="Number"
          value={selectedStatusToEdit.hours_spent}
          onChange={(e) =>
            dispatch(statusAction.updateStatus({hours_spent: e.target.value}))
          }
        />

        <TextField
          style={{ width: "250px" }}
          label="Comment"
          value={selectedStatusToEdit.comments}
          onChange={(e) =>
            dispatch(statusAction.updateStatus({comments: e.target.value}))
          }
        />
        <div style={{ width: "250px" }}>
          <Select
            styles={customStyles}
            options={options}
            placeholder="Status... "
            defaultValue={{
              label: selectedStatusToEdit.status || "Select ",
              value: selectedStatusToEdit.status,
            }}
            onChange={(value) =>
              dispatch(statusAction.updateStatus({status: value.value}))
            }
          />
        </div>
        <Button size="large" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Box>
    </Dialog>
  );
};

export default React.memo(EditStatusModal);
