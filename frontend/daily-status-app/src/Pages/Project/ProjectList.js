import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../slice/projectSlice";

const columns = [
  { field: "project_id", headerName: "ID", width: 90 },
  {
    field: "project_name",
    headerName: "Project Name",
    width: 200,
    editable: true,
  },
  {
    field: "project_start_dt",
    headerName: "Start Date",
    width: 200,
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
    width: 200,
    sortable: false,
  },
];

const ProjectList = () => {
  const [rows, setRows] = useState([]);
  const { projectList } = useSelector((store) => store.project);

  console.log(projectList);
  useEffect(() => {
    const newRows = projectList.map((value) => ({ id: value.project_id, ...value }))
    setRows(newRows);
  }, [projectList]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProject({ empId: 10 }));
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

export default ProjectList;
