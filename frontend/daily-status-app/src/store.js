import { configureStore } from '@reduxjs/toolkit'
import {projectReducer} from './slice/projectSlice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
})