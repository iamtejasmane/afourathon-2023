import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProjectApi , createProjectApi} from "../apis/project-api";

const initialState = {
  projectList: [],
  selectedProject: {},
};

export const getAllProject = createAsyncThunk(
  "getAllProject",
  async ({empId}) => {
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


export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProject.fulfilled, (state, action)=>{
        state.projectList = action.payload;
    });
    
    builder.addCase(createNewProject.fulfilled, (state, action)=>{
      
    })

  },
});


export const projectAction = projectSlice.actions;
export const projectReducer = projectSlice.reducer;