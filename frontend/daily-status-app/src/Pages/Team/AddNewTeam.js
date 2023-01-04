import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import TeamList from "./TeamList";
import { getTeamsForProject, teamsActions } from "../../slice/teamSlice";
import isEmpty from "lodash";

const AddNewTeam = () => {
  const [option, setOptions] = useState([]);
  const { selectedProjectForTeam } = useSelector((store) => store.teams);
  const { projectList } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredProjectList =
      projectList.length > 0 &&
      projectList.reduce((acc, curr) => {
        return [
          ...acc,
          {
            value: curr.project_name,
            label: curr.project_name,
            ...curr,
          },
        ];
      }, []);

    setOptions(filteredProjectList);
  }, [projectList]);

  function handleProjectSelectChange(value) {
    dispatch(getTeamsForProject({ empId: 10, project_id: value?.project_id }));
    dispatch(teamsActions.setselectedProjectForTeam(value));
  }

  const handleOpen = () => {};

  return (
    <div>
      <Grid container sx={{ padding: "20px 50px 10px" }}>
        <Grid xs={8}>
          <Typography variant="h4">TEAMS</Typography>
        </Grid>
        <Grid xs={3}>
          <Button
            onClick={handleOpen}
            size="large"
            variant="contained"
            color="primary"
            disabled={!!!selectedProjectForTeam?.project_id}
          >
            Create New Team
          </Button>
          {/* <AddProjectForm open={open} setOpen={setOpen}/> */}
        </Grid>
      </Grid>
      <div style={{ width: "300px", padding: "20px 50px 10px" }}>
        <Select
          options={option}
          placeholder="Select Project"
          onChange={handleProjectSelectChange}
        />
      </div>
      <div>
        <TeamList />
      </div>
    </div>
  );
};

export default AddNewTeam;
