import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentsState, Appointment } from './types'

const initialState: AppointmentsState = {
  appointments: [],
  agenda: {
    '2022-11-23': [
      { name: 'Turno - Poli', height: 11.3, day: new Date().toISOString() },
      { name: 'Turno - Pato', height: 14, day: new Date().toISOString() },
      { name: 'Turno - Pato', height: 17.15, day: new Date().toISOString() },
    ],
    '2022-11-24': [{ name: 'Turno - Mimi', height: 11.3, day: new Date().toISOString() }],
  },
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload
    },

    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments = [...state.appointments, action.payload]
    },
  },
})

export const { addAppointment, setAppointments } = appointmentSlice.actions

export default appointmentSlice.reducer
