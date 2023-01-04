import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppointmentsState, Appointment } from './types'
import dayjs from 'dayjs'

const initialState: AppointmentsState = {
  appointments: [
    {
      id: 'akd2019i0129kasda12312',
      client: 'Pato',
      day: new Date('2023-01-03T21:38:18.250+00:00'),
      price: 1500,
      description: 'Turno con pato para tatuarle un pato',
      done: false,
      hasPayedAdvancedDeposit: false,
      advancedDepositAmount: 0,
      clientContact: '@patoelgato',
      images: [
        'https://thumbs.dreamstime.com/b/gato-con-pato-de-goma-amarillo-y-pelirrojo-aislados-sobre-fondo-blanco-espacio-copia-215517240.jpg',
      ],
    },
    {
      id: 'akd2019i0129kasdasda',
      client: 'Mimi',
      day: new Date('2023-01-03T21:38:18.250+00:00'),
      price: 2700,
      description: 'Turno con mimi para tatuarse una paloma',
      done: true,
      hasPayedAdvancedDeposit: true,
      advancedDepositAmount: 1200,
      clientContact: '@mimimimosa',
    },
    {
      id: 'akd2019i0129kas23da',
      client: 'Poa',
      day: new Date('2023-01-02T21:38:18.250+00:00'),
      price: 2200,
      done: false,
      hasPayedAdvancedDeposit: false,
      advancedDepositAmount: 0,
      clientContact: '@ppppoa',
    },
  ],
  agenda: {
    '2023-01-03': [
      { name: 'Turno - Poli', height: 11.3, day: new Date().toISOString() },
      { name: 'Turno - Mimi', height: 14, day: new Date().toISOString() },
    ],
    '2023-01-02': [{ name: 'Turno - Poa', height: 11.3, day: new Date().toISOString() }],
  },
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
        console.log({ day: appointment.day, payload: action.payload })

        if (dayjs(appointment.day).isSame(action.payload, 'day')) {
          return appointment
        }
      })

      state.currentAppointments = currentAppointments
    },
  },
})

export const { addAppointment, setAppointments, setSelectedDay } = appointmentSlice.actions

export default appointmentSlice.reducer
