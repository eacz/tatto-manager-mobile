import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentsState, Appointment, TattoResponse } from './types'
import dayjs from 'dayjs'
import { getTattos } from './actions'

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
    builder.addCase(getTattos.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
      const appointmentsSorted = action.payload.sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
      )

      const AppointmentsWithSimpleDate = appointmentsSorted.map((a) => ({
        ...a,
        day: dayjs(a.day).format('YYYY-MM-DD'),
      }))

      const appointmentsForAgenda: Record<any, any> = AppointmentsWithSimpleDate.reduce((previous, current) => {
        //TODO fix this type error
        previous[current.day] = previous[current.day] || []
        previous[current.day].push(current)
        return previous
      }, {})


      state.appointments = appointmentsSorted
      state.agenda = appointmentsForAgenda
    })
  },
})

export const { addAppointment, setAppointments, setSelectedDay } = appointmentSlice.actions

export default appointmentSlice.reducer
