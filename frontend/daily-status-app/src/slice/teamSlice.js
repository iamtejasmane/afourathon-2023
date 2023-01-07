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
  openTeamsModal: false,
  selectedTeam: {},
  loading: false,
  error: null,
};

export const getTeamsForProject = createAsyncThunk(
  "getTeams",
  async ({ empId, project_id }) => {
    const response = await getTeamsApi({ empId, projectId: project_id });
    return response.data;
  }
);
export const createNewTeam = createAsyncThunk(
  "createNewPTeam",
  async (body) => {
    const response = await createTeamsApi(body);
    return response.data;
  }
);

export const deleteTeam = createAsyncThunk("deleteProject", async (body) => {
  const response = await deleteTeamsApi(body);
  return response.data;
});

export const updateTeam = createAsyncThunk("updateTeam", async (body) => {
  const response = await updateTeamsApi(body);
  return response.data;
});

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
    setTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    unSetTeam: (state) => {
      state.selectedTeam = {};
    },
    setOpenTeamModal: (state) => {
      state.openTeamsModal = true;
    },
    setCloseTeamModal: (state) => {
      state.openTeamsModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamsForProject.fulfilled, (state, action) => {
      state.teamsList = action.payload;
      state.loading = false;
    });
    builder.addCase(getTeamsForProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTeamsForProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createNewTeam.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNewTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTeam.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const teamsActions = teamSlice.actions;
export const teamsReducers = teamSlice.reducer;
