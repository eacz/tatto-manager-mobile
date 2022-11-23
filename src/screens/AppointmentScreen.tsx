import { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const AppointmentScreen = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  const [showTime, setShowTime] = useState(false)
  const [showDate, setShowDate] = useState(false)

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDate(false)
  }

  const onChangeTime = (event: any, selectedDate: Date | undefined) => {
    setShowTime(false)
  }

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Text>Turno</Text>

      <TextInput style={styles.input} placeholder='Cliente' />

      <TextInput style={styles.input} keyboardType='numeric' placeholder='Precio' />

      <Text style={styles.input} onPress={() => setShowDate(true)}>
        Fecha
      </Text>
      {showDate && (
        <DateTimePicker
          testID='dateTimePicker'
          is24Hour={true}
          mode='date'
          value={new Date()}
          onChange={onChangeDate}
        />
      )}
      <Text style={styles.input} onPress={() => setShowTime(true)}>
        Hora
      </Text>
      {showTime && (
        <DateTimePicker
          testID='dateTimePicker'
          is24Hour={true}
          mode='time'
          value={new Date()}
          onChange={onChangeTime}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1},
  input: { marginTop: 20 },
})
