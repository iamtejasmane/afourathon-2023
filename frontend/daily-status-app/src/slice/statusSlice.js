import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserStatusApi,
  createStatusApi,
  deleteStatusApi,
  updateStatusApi,
} from "../apis/status-api";
const initialState = {
  statusList: [],
  selectedStatusToEdit: {},
  isOpenEditStatusModal: false,
  loading: false,
  error: null,
  snackStatus :{value: null, error: null}
};

export const getStatusOfUser = createAsyncThunk(
  "getStatusOfUser",
  async ({ empId }) => {
    const response = await getUserStatusApi({ empId });
    return response.data;
  }
);
export const createStatus = createAsyncThunk("createStatus", async (body) => {
  const response = await createStatusApi(body);
  return response.data;
});
export const deleteStatus = createAsyncThunk("deleteStatus", async (body) => {
  const response = await deleteStatusApi(body);
  return response.data;
});
export const updateStatus = createAsyncThunk("updateStatus", async (body) => {
  console.log(body);
  const response = await updateStatusApi(body);
  return response.data;
});

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatusForEdit: (state, action) => {
      state.selectedStatusToEdit = action.payload;
    },
    unSetStatusForEdit: (state) => {
      state.selectedStatusToEdit = {};
    },
    setStatusEditModal: (state) => {
      state.isOpenEditStatusModal = true;
    },
    unSetStatusEditModal: (state) => {
      state.isOpenEditStatusModal = false;
    },
    updateStatus: (state, action) => {
      console.log(action);
      state.selectedStatusToEdit = {
        ...state.selectedStatusToEdit,
        ...action.payload,
      };
    },
    setSnackStatus : (state, action)=>{
      state.snackStatus = {value: null, error: null}
    }
  },
  extraReducers: (builder) => {
    //get user status
    builder.addCase(getStatusOfUser.fulfilled, (state, action) => {
      state.statusList = action.payload;
      state.loading = false;
    });
    builder.addCase(getStatusOfUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStatusOfUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createStatus.fulfilled, (state, action)=>{
      state.snackStatus = {value: "Status Created!", error: false}
    })
    builder.addCase(createStatus.rejected, (state, action)=>{
      state.snackStatus = {value: "Status Failed to Created!", error: false}
    })


    builder.addCase(updateStatus.fulfilled, (state, action)=>{
      state.snackStatus = {value: "Status Updated!", error: false}
    })
    builder.addCase(updateStatus.rejected, (state, action)=>{
      state.snackStatus = {value: "Status Failed to Updated!", error: false}
    })

    builder.addCase(deleteStatus.fulfilled, (state, action)=>{
      state.snackStatus = {value: "Status deleted!", error: false}
    })
    builder.addCase(deleteStatus.rejected, (state, action)=>{
      state.snackStatus = {value: "Status Failed to delete!", error: false}
    })

  },
});

export const statusAction = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
