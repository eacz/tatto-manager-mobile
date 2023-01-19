import { AgendaSchedule } from 'react-native-calendars'

export interface Appointment {
  _id: string
  client: string
  day: Date
  price: number
  description?: string
  images?: [string]
  clientContact?: string
  hasPayedAdvancedDeposit?: boolean
  advancedDepositAmount?: number
  done?: boolean
  hours?: number
}

export interface AppointmentsState {
  agenda: AgendaSchedule
  appointments: Appointment[]
  currentAppointments: Appointment[]
  selectedDay: Date
}

export interface TattooResponse {
  _id: string
  client: string
  day: string
  price: number
  description?: string
  images: string[]
  clientContact: string
  hasPayedAdvancedDeposit: boolean
  advancedDepositAmount: number
  done: boolean
}
