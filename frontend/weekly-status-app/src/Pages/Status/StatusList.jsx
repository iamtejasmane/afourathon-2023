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
  const { statusList, selectedProjectForStatusUpdate } = useSelector((store) => store.status);

  useEffect(() => {
    dispatch(getStatusOfUser({ project_id: selectedProjectForStatusUpdate.project_id }));
  }, [selectedProjectForStatusUpdate.project_id]);

  const handleDelete = async (status_id) => {
    await dispatch(deleteStatus({ status_id }));
    await dispatch(getStatusOfUser({ project_id: selectedProjectForStatusUpdate.project_id }));
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
                <Typography variant="h6">
                  Status : {listItem.status}
                </Typography>
                <Typography>
                  Highlights :{" "}
                  <Typography variant="span" color="secondary">
                    {listItem.highligth}
                  </Typography>{" "}
                </Typography>
                <Typography>Risk: {listItem.risk}</Typography>
                <Typography>Week Ending Date: {listItem.date.slice(0,10)}</Typography>
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
