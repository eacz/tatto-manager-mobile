import { AgendaSchedule, AgendaEntry } from 'react-native-calendars';

export interface Appointment extends AgendaEntry {
  title: string,
  price: number,
  image?: string,
  
}

export interface AppointmentsState {
  agenda: AgendaSchedule
  appointments: Appointment[]
}
