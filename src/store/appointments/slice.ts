import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { AppointmentsState, Appointment } from './types'
import { getTattoos, createTattoo } from './actions'
import { parseAppointmentToAgenda } from '../../helpers'

const initialState: AppointmentsState = {
  appointments: [],
  agenda: {},
  selectedDay: new Date(),
  currentAppointments: [],
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
    builder.addCase(getTattoos.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
      const { appointmentsForAgenda, appointmentsSorted } = parseAppointmentToAgenda(action.payload)

      state.appointments = appointmentsSorted
      state.agenda = appointmentsForAgenda
    })

    builder.addCase(createTattoo.fulfilled, (state, action: PayloadAction<Appointment>) => {
      const { appointmentsForAgenda, appointmentsSorted } = parseAppointmentToAgenda([
        ...state.appointments,
        action.payload,
      ])

      state.appointments = appointmentsSorted
      state.agenda = appointmentsForAgenda
    })
  },
})

export const { addAppointment, setAppointments, setSelectedDay } = appointmentSlice.actions

export default appointmentSlice.reducer
