import axios from "axios";
require("dotenv").config();
const projectBaseUrl = process.env.REACT_APP_KEY_PROJECT_SERVER;

export const getProjectApi = async (body) => {
  const { empId } = body;
  try {
    const { data } = await axios.get(projectBaseUrl + "projects/" + empId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createProjectApi = async (body) => {
  const {
    project_name,
    project_start_dt,
    project_end_dt,
    project_manager_name,
    project_manager_email,
    empId,
  } = body;
  try {
    const { data } = await axios.post(projectBaseUrl + "projects/" + empId, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProjectApi = async (body) => {
  const {
    project_name,
    project_start_dt,
    project_end_dt,
    project_manager_name,
    project_manager_email,
    project_id,
  } = body;
  try {
    const { data } = await axios.put(projectBaseUrl + "projects/" + project_id, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProjectApi = async (body) => {
  const { projectId } = body;
  try {
    const { data } = await axios.delete(
      projectBaseUrl + "projects/" + projectId
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
