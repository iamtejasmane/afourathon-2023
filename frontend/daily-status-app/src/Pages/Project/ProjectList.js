import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../slice/projectSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject, projectAction } from "../../slice/projectSlice";

const ProjectList = () => {
  const [rows, setRows] = useState([]);
  const { projectList } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  function handleEditProject(row) {
    dispatch(projectAction.openUpdateProjectModal())
    dispatch(projectAction.setProject(row))
  }
  async function handleDelete(projectId) {
    await dispatch(deleteProject({ projectId }));
    await dispatch(getAllProject({ empId: 2 }));
  }
  const columns = [
    { field: "project_id", headerName: "ID", width: 90 },
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
    },
    {
      field: "project_end_dt",
      headerName: "End Date",
      width: 200,
      editable: true,
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
              <IconButton onClick={()=>handleEditProject(row)}>
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
  ];

  useEffect(() => {
    const newRows = projectList.map((value) => ({
      id: value.project_id,
      ...value,
    }));
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
