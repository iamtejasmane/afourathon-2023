import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../slice/projectSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject, projectAction } from "../../slice/projectSlice";
import { useUser } from "../../contexts";

const ProjectList = () => {
  const [rows, setRows] = useState([]);
  const { projectList } = useSelector((store) => store.project);
  const { user } = useUser();
  const dispatch = useDispatch();

  console.log(projectList);
  function handleEditProject(row) {
    console.log(row);
    dispatch(projectAction.openUpdateProjectModal());
    dispatch(projectAction.setProject(row));
  }
  async function handleDelete(projectId) {
    await dispatch(deleteProject({ projectId }));
    await dispatch(getAllProject({ empId: user.empId }));
  }
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "project_id", headerName: "Project Id", width: 90 },
      {
        field: "project_name",
        headerName: "Project Name",
        width: 150,
        editable: true,
      },
      {
        field: "project_start_dt",
        headerName: "Start Date",
        width: 150,
        editable: true,
        renderCell: ({ row }) => {
          return row.project_start_dt.slice(0, 10)
        }
      },
      {
        field: "project_end_dt",
        headerName: "End Date",
        width: 200,
        editable: true,
        renderCell: ({ row }) => {
          return row.project_end_dt.slice(0, 10)
        }
      },
      {
        field: "project_manager_name",
        headerName: "Manager Name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 200,
      },
      {
        field: "project_manager_email",
        headerName: "Manager Email",
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
                <IconButton onClick={() => handleEditProject(row)}>
                  <EditIcon color={"primary"} />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton onClick={() => handleDelete(row.project_id)}>
                  <DeleteIcon sx={{ color: "#e6735a" }} />
                </IconButton>
              </Grid>
            </Grid>
          );
        },
      },
    ],
    [rows]
  );

  const newRows = useMemo(
    () =>
      projectList.map((value, index) => ({
        id: index + 1,
        ...value,
      })),
    []
  );

  useEffect(() => {
    setRows(newRows);
  }, [projectList]);
  return (
    <div>
      <Box sx={{ height: "70vh", maxWidth: "80%", padding: "50px" }}>
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

export default ProjectList;
