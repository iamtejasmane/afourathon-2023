import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import DataGrid from 'react-data-grid';
import { Box } from "@mui/material";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'projectName',
      headerName: 'Project Name',
      width: 200,
      editable: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 200,
      editable: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 200,
      editable: true,
    },
    {
      field: 'managerName',
      headerName: 'Manager Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
    {
      field: 'managerEmail',
      headerName: 'Manager Email',
      width: 200,
    },
  ];

const rows = [
    { id: 1, projectName: 'Snow', startDate: 'Jon', endDate: 35 ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 2, projectName: 'Lannister', startDate: 'Cersei', endDate: 42 ,managerName:"Vijay",  managerEmail: "example@email.com"},
    { id: 3, projectName: 'Lannister', startDate: 'Jaime', endDate: 45 ,managerName:"Vijay",  managerEmail: "example@email.com"},
    { id: 4, projectName: 'Stark', startDate: 'Arya', endDate: 16 ,managerName:"Vijay",  managerEmail: "example@email.com"},
    { id: 5, projectName: 'Targaryen', startDate: 'Daenerys', endDate: null ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 6, projectName: 'Melisandre', startDate: null, endDate: 150 ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 7, projectName: 'Clifford', startDate: 'Ferrara', endDate: 44 ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 8, projectName: 'Frances', startDate: 'Rossini', endDate: 36 ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 9, projectName: 'Roxie', startDate: 'Harvey', endDate: 65 ,managerName:"Vijay", managerEmail: "example@email.com"},
    { id: 10, projectName: 'Roxie', startDate: 'Harvey', endDate: "Hello" ,managerName:"Vijay", managerEmail: "example@email.com"},
  ];

const ProjectList = () => {
  return (
    <div >
      <Box sx={{ height: 634, maxWidth: "80%", padding: "50px"}}>
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
