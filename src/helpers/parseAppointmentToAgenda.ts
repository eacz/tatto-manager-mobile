import dayjs from 'dayjs'
import { Appointment } from '../store/appointments/types'

export const parseAppointmentToAgenda = (appoinments: Appointment[]) => {
  const appointmentsSorted = appoinments.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())

  const AppointmentsWithSimpleDate = appointmentsSorted.map((a) => ({
    ...a,
    day: dayjs(a.day).format('YYYY-MM-DD'),
  }))

  const initialState: Record<string, Array<any>> = {}

  const appointmentsForAgenda = AppointmentsWithSimpleDate.reduce((previous, current) => {
    previous[current.day] = previous[current.day] || []
    previous[current.day].push(current)
    return previous
  }, initialState)

  return {
    appointmentsSorted,
    appointmentsForAgenda,
  }
}
