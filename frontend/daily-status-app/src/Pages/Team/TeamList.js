import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../slice/projectSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject, projectAction } from "../../slice/projectSlice";
import { teamsActions } from "../../slice/teamSlice";

const TeamList = () => {
  const [rows, setRows] = useState([]);
  const { teamsList } = useSelector((store) => store.teams);
  const dispatch = useDispatch();

  function handleEdit(row) {
    // dispatch(projectAction.openUpdateProjectModal())
    // dispatch(projectAction.setProject(row))
  }
  async function handleDelete(projectId) {
    await dispatch(deleteProject({ projectId }));
    await dispatch(getAllProject({ empId: 10 }));
  }
  const columns = [
    { field: "team_id", headerName: "ID", width: 90 },
    { field: "project_id", headerName: "Project ID", width: 90 },
    {
      field: "team_name",
      headerName: "Team Name",
      width: 150,
      editable: false,
    },
    {
      field: "team_start_dt",
      headerName: "Start Date",
      width: 150,
      editable: false,
    },
    {
      field: "team_end_dt",
      headerName: "End Date",
      width: 200,
      editable: false,
    },
    {
      field: "team_lead_name",
      headerName: "Team Lead",
      sortable: false,
      width: 200,
      editable: false,
    },
    {
      field: "team_lead_email",
      headerName: "Team Lead Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingTop: "20px" }}
          >
            <Grid>
              <IconButton onClick={()=>handleEdit(row)}>
                <EditIcon color={"primary"} />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton onClick={() => handleDelete(row.team_id)}>
                <DeleteIcon sx={{ color: "#e6735a" }} />
              </IconButton>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  useEffect(() => {
    const newRows = teamsList.map((value) => ({
      id: value.team_id,
      ...value,
    }));
    setRows(newRows);

    return ()=> setRows([]);
  }, [teamsList]);

  useEffect(() => {
    // dispatch(getAllProject({ empId: 10 }));
  }, []);

  return (
    <div>
      <Box sx={{ height: "50vh", maxWidth: "80%", padding: "50px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default TeamList;
