import { StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'

export const AppointmentScreen = () => {
  const [showTime, setShowTime] = useState(false)
  const [showDate, setShowDate] = useState(false)

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDate(false)
  }

  const onChangeTime = (event: any, selectedDate: Date | undefined) => {    
    setShowTime(false)
  }

  return (
    <View>
      <Text>Turno</Text>

      <TextInput style={styles.input} placeholder='Cliente' />

      <TextInput style={styles.input} keyboardType='numeric' placeholder='Precio' />

      <Text style={styles.input} onPress={() => setShowDate(true)}>Fecha</Text>
      {showDate && (
        <DateTimePicker
          testID='dateTimePicker'
          is24Hour={true}
          mode='date'
          value={new Date()}
          onChange={onChangeDate}
        />
      )}
      <Text  style={styles.input} onPress={() => setShowTime(true)}>Hora</Text>
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
  input: {marginTop: 20},
})
