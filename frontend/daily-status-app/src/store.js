import { configureStore } from '@reduxjs/toolkit'
import {projectReducer} from './slice/projectSlice'
import {teamsReducers} from './slice/teamSlice'
import {statusReducer} from './slice/statusSlice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    teams: teamsReducers,
    status: statusReducer,
  },
})