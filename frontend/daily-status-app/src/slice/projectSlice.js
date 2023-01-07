import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProjectApi,
  createProjectApi,
  deleteProjectApi,
  updateProjectApi,
} from "../apis/project-api";

const initialState = {
  projectList: [],
  selectedProject: {},
  updateProjectModal: false,
  loading: false,
  error: null,
};

export const getAllProject = createAsyncThunk(
  "getAllProject",
  async ({ empId }) => {
    const response = await getProjectApi({ empId });
    return response.data;
  }
);
export const createNewProject = createAsyncThunk(
  "createNewProject",
  async (body) => {
    const response = await createProjectApi(body);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk("deleteProject", async (body) => {
  const response = await deleteProjectApi(body);
  return response.data;
});

export const updateProject = createAsyncThunk("updateProject", async (body) => {
  const response = await updateProjectApi(body);
  return response.data;
});

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    unsetProject: (state) => {
      state.selectedProject = [];
    },
    openUpdateProjectModal: (state, action) => {
      state.updateProjectModal = true;
    },
    closeUpdateProjectModal: (state, action) => {
      state.updateProjectModal = false;
    },
  },
  extraReducers: (builder) => {
    //get projects
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.projectList = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //create project
    builder.addCase(createNewProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNewProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //delete project
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // //updateProject
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const projectAction = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
