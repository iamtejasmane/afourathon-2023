import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTeamsApi,
  createTeamsApi,
  updateTeamsApi,
  deleteTeamsApi,
} from "../apis/teams-api";

const initialState = {
  teamsList: [],
  selectedProjectForTeam: {},
  updateTeamModal: false,
};

export const getTeamsForProject = createAsyncThunk(
  "getTeams",
  async ({ empId , project_id}) => {
    const response = await getTeamsApi({ empId ,projectId: project_id });
    return response.data;
  }
);
// export const createNewProject = createAsyncThunk(
//   "createNewProject",
//   async (body) => {
//     const response = await createProjectApi(body);
//     return response.data;
//   }
// );

// export const deleteProject = createAsyncThunk("deleteProject", async (body) => {
//   const response = await deleteProjectApi(body);
//   return response.data;
// });

// export const updateProject = createAsyncThunk("updateProject", async (body) => {
//   const response = await updateProprojectListjectApi(body);
//   return response.data;
// });

export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setselectedProjectForTeam: (state, action) => {
      state.selectedProjectForTeam = action.payload;
    },
    unsetselectedProjectForTeam: (state, action) => {
      state.selectedProjectForTeam = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamsForProject.fulfilled, (state, action) => {
      state.teamsList = action.payload;
    });
  },
});

export const teamsActions = teamSlice.actions;
export const teamsReducers = teamSlice.reducer;
