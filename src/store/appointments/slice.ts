import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { AppointmentsState, Appointment } from './types'
import { getTattoos, createTattoo, updateTattoo, deleteTattoo } from './actions'
import { parseAppointmentToAgenda } from '../../helpers'

const initialState: AppointmentsState = {
  appointments: [],
  agenda: {},
  selectedDay: new Date(),
  currentAppointments: [],
  loading: true,
  error: null,
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
    setSelectedDay: (state, action: PayloadAction<Date>) => {
      state.selectedDay = action.payload

      const currentAppointments = state.appointments.filter((appointment) => {
        if (dayjs(appointment.day).isSame(action.payload, 'day')) {
          return appointment
        }
      })

      state.currentAppointments = currentAppointments
    },
  },
  extraReducers(builder) {
    builder.addCase(getTattoos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTattoos.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
      const { appointmentsForAgenda, appointmentsSorted, currentAppointments } = parseAppointmentToAgenda(
        action.payload,
        state.selectedDay
      )
      state.loading = false
      state.appointments = appointmentsSorted
      state.agenda = appointmentsForAgenda
      state.currentAppointments = currentAppointments
    })
    //TODO set error messages
    builder.addCase(getTattoos.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(createTattoo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createTattoo.fulfilled, (state, action: PayloadAction<Appointment>) => {
      const { appointmentsForAgenda, appointmentsSorted, currentAppointments } = parseAppointmentToAgenda(
        [...state.appointments, action.payload],
        state.selectedDay
      )

      state.appointments = appointmentsSorted
      state.agenda = appointmentsForAgenda
      state.currentAppointments = currentAppointments
      state.loading = false
    })
    //TODO set error messages
    builder.addCase(createTattoo.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(updateTattoo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateTattoo.fulfilled, (state, action: PayloadAction<Appointment>) => {
      state.appointments = state.appointments.map((appointment) =>
        appointment._id === action.payload._id ? action.payload : appointment
      )

      state.currentAppointments = state.currentAppointments.map((appointment) =>
        appointment._id === action.payload._id ? action.payload : appointment
      )

      state.loading = false
    })
    //TODO set error messages
    builder.addCase(updateTattoo.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deleteTattoo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteTattoo.fulfilled, (state, action: PayloadAction<string>) => {
      const deletedAppointment = state.appointments.find((appointment) => appointment._id === action.payload)
      state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload)
      state.currentAppointments = state.currentAppointments.filter(
        (appointment) => appointment._id !== action.payload
      )

      const { appointmentsForAgenda } = parseAppointmentToAgenda(state.appointments, state.selectedDay)
      state.agenda = appointmentsForAgenda

      state.loading = false
    })
    //TODO set error messages
    builder.addCase(deleteTattoo.rejected, (state) => {
      state.loading = false
    })
  },
})

export const { addAppointment, setAppointments, setSelectedDay } = appointmentSlice.actions

export default appointmentSlice.reducer
