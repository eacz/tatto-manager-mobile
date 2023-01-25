import { View, StyleSheet } from 'react-native'
import { useAppSelector } from '../../hooks/redux'
import { AppointmentSummary } from '.'
import { NoAppointment } from '../agenda'
const Appointments = () => {
  const { currentAppointments } = useAppSelector((state) => state.appointment)

  return (
    <View style={styles.container}>
      {currentAppointments.length === 0 && <NoAppointment />}
      {currentAppointments.map((appoinment) => (
        <AppointmentSummary appointment={appoinment} key={appoinment._id} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
})

export default Appointments
