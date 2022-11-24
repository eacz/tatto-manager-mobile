import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './appointments/slice'
export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
