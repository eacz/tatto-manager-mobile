import dayjs from 'dayjs'
import { Appointment } from '../store/appointments/types'

export const parseAppointmentToAgenda = (appointments: Appointment[], date?: Date) => {
  const appointmentsSorted = appointments.sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  )

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

  let currentAppointments: Appointment[] = []
  if (date) {
    currentAppointments = appointments.filter((appointment) => {
      if (dayjs(appointment.day).isSame(date, 'day')) {
        return appointment
      }
    })
  }

  return {
    appointmentsSorted,
    appointmentsForAgenda,
    currentAppointments,
  }
}
