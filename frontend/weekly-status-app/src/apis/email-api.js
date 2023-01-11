import axios from "axios";

const emailBaseUrl = import.meta.env.VITE_APP_KEY_EMAIL_SERVER;

export const sendProjectWeeklyMails = async (body) => {
  const { project_id } = body;
  try {
    const { data } = axios.get(emailBaseUrl + "sendgrid-mail/" + project_id);
    return data;
  } catch (error) {
    console.log(error)
  }
};
