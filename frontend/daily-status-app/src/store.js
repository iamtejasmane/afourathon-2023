import { configureStore } from '@reduxjs/toolkit'
import {projectReducer} from './slice/projectSlice'
import {teamsReducers} from './slice/teamSlice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    teams: teamsReducers,
  },
})