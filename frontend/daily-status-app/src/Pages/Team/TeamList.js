import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  teamsActions,
  deleteTeam,
  getTeamsForProject,
} from "../../slice/teamSlice";
import { isEmpty } from "lodash";
import { useUser } from "../../contexts";

const TeamList = () => {
  const [rows, setRows] = useState([]);
  const { teamsList, selectedProjectForTeam, loading } = useSelector(
    (store) => store.teams
  );
  const dispatch = useDispatch();
  const {user} = useUser();

  function handleEdit(row) {
    dispatch(teamsActions.setOpenTeamModal());
    dispatch(teamsActions.setTeam(row));
  }
  async function handleDelete(team_id) {
    await dispatch(deleteTeam({ teamId: team_id }));
    await dispatch(
      getTeamsForProject({
        empId: user.empId,
        project_id: selectedProjectForTeam.project_id,
      })
    );
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "team_id", headerName: "team_id", width: 90 },
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
      renderCell: ({ row }) => {
        return row.team_start_dt.slice(0, 10)
      }
      
    },
    {
      field: "team_end_dt",
      headerName: "End Date",
      width: 200,
      editable: false,
      renderCell: ({ row }) => {
        return row.team_end_dt.slice(0, 10)
      }
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
              <IconButton onClick={() => handleEdit(row)}>
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
    const newRows = teamsList.map((value, index) => ({
      id: index + 1,
      ...value,
    }));
    setRows(newRows);

    return () => setRows([]);
  }, [teamsList]);

  return (
    <div>
      {loading === false ? (
        <Box sx={{ height: "50vh", maxWidth: "80%", padding: "50px" }}>
          {!isEmpty(selectedProjectForTeam) && (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
        </Box>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default TeamList;
