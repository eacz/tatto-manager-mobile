import { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { Appointment } from '../../store/appointments/types'

interface Props {
  appointment: Appointment
}

const AppointmentSummary = ({ appointment }: Props) => {
  const {
    theme: { colors, h5 },
  } = useContext(ThemeContext)

  const navigation = useNavigation()

  const hourParsed = dayjs(appointment.day).format('HH:MM')

  const handlePress = () => {
    navigation.navigate('Appointment')
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ ...styles.container, borderColor: colors.primary }}>
        <View style={{ ...styles.left }}>
          <Text style={{ fontWeight: 'bold', fontSize: h5 }}>{hourParsed}</Text>
        </View>
        <View style={{ ...styles.right }}>
          <Text style={{ fontSize: h5 }}>{appointment.client}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  left: {},
  right: {
    marginLeft: 40,
  },
})

export default AppointmentSummary
