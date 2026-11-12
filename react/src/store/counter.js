import { configureStore } from '@reduxjs/toolkit'
import nameReducer from './reduxStore'

export const reduxStore = configureStore({
  reducer: {
    names: nameReducer
  }
})