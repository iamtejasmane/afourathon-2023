// http://localhost:8016/daily-status/empId
import axios from "axios";
require("dotenv").config();
const baseStatusUrl = process.env.REACT_APP_KEY_STATUS_SERVER;

export const getUserStatusApi = async (body) => {
  try {
    const { empId } = body;
    const { data } = await axios.get(baseStatusUrl + "daily-status/" + empId);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createStatusApi = async (body) => {
  try {
    const { empId } = body;
    const { data } = await axios.post(baseStatusUrl + "daily-status/" + empId, {
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
      baseStatusUrl + "daily-status/" + status_id
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusApi = async (body) => {
  try {
    const { status_id } = body;
    const { data } = await axios.put(baseStatusUrl + "daily-status/" + status_id, {
      ...body,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};