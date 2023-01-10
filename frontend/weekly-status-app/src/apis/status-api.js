// http://localhost:8016/daily-status/empId
import axios from "axios";
import env from "react-dotenv";
const baseStatusUrl = import.meta.env.VITE_APP_KEY_STATUS_SERVER;

export const getUserStatusApi = async (body) => {
  try {
    const { project_id } = body;
    const { data } = await axios.get(baseStatusUrl + "weekly-status/" + project_id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createStatusApi = async (body) => {
  try {
    const { project_id } = body;
    const { data } = await axios.post(baseStatusUrl + "weekly-status/" + project_id, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStatusApi = async (body) => {
  try {
    const { status_id } = body;
    const { data } = await axios.delete(
      baseStatusUrl + "weekly-status/" + status_id
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusApi = async (body) => {
  try {
    const { status_id } = body;
    const { data } = await axios.put(baseStatusUrl + "weekly-status/" + status_id, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};