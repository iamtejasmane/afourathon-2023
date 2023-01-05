import axios from "axios";
require("dotenv").config();
const teamsBaseUrl = process.env.REACT_APP_KEY_TEAMS_SERVER;

// http://localhost:8012/teams/empId?project_id=2
export const getTeamsApi = async (body) => {
  const { empId, projectId } = body;
  try {
    const { data } = await axios.get(
      teamsBaseUrl + "teams/" + empId + "?" + "project_id=" + projectId
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createTeamsApi = async (body) => {
  const { empId } = body;
  try {
    const { data } = await axios.post(teamsBaseUrl + "teams/" + empId, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// http://localhost:8012/teams/teamId
export const updateTeamsApi = async (body) => {
  const { teamId, projectId } = body;
  try {
    const { data } = await axios.put(
      teamsBaseUrl + "team/" + teamId + "?project_id=" + projectId,
      {
        ...body,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTeamsApi = async (body) => {
  const { teamId } = body;
  try {
    const { data } = await axios.delete(teamsBaseUrl + "teams/" + teamId);
    return data;
  } catch (err) {
    console.log(err);
  }
};
