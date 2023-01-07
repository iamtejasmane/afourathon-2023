import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStatus,
  getStatusOfUser,
  statusAction,
} from "../../slice/statusSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../../contexts";

const StatusList = () => {
  const dispatch = useDispatch();
  const { statusList } = useSelector((store) => store.status);
  const {user} = useUser();

  useEffect(() => {
    console.log("called", user)
    dispatch(getStatusOfUser({ empId: user.empId}));
  }, [user.empId]);

  const handleDelete = async (status_id) => {
    await dispatch(deleteStatus({ status_id }));
    await dispatch(getStatusOfUser({ empId: user.empId }));
  };

  const handleEdit = async (status) => {
    dispatch(statusAction.setStatusForEdit(status));
    dispatch(statusAction.setStatusEditModal());
  };
  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        display: "flex",
        flexDirection: "column-reverse",
        flexWrap: "wrap",
      }}
    >
      {statusList.map((listItem) => {
        return (
          <div
            key={listItem.status_id}
            style={{
              margin: "20px 250px 0px 0px",
            }}
          >
            <Paper sx={{ padding: "10px", display: "flex" }}>
              <Box>
                <Typography variant="subtitle2">
                  Ticket : {listItem.ticket_id}
                </Typography>
                <Typography>
                  Status :{" "}
                  <Typography variant="span" color="secondary">
                    {listItem.status}
                  </Typography>{" "}
                </Typography>
                <Typography>Hours Spent : {listItem.hours_spent}</Typography>
                <Typography>Comment: {listItem.comments}</Typography>
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "2 <StatusList />0px",
                }}
              >
                <div>
                  <IconButton onClick={() => handleDelete(listItem.status_id)}>
                    <DeleteIcon sx={{ color: "#e6735a" }} />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(listItem)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                </div>
              </Box>
            </Paper>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(StatusList);
