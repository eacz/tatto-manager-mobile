import { useContext, useState } from 'react'
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { Appointment } from '../store/appointments/types'
import dayjs from 'dayjs'
import useForm from '../hooks/useForm'

type AppointmentWithoutId = Omit<Appointment, '_id'>

export const AppointmentScreen = () => {
  const {
    theme: { colors, h5, h6 },
  } = useContext(ThemeContext)
  const [showTime, setShowTime] = useState(false)
  const [showDate, setShowDate] = useState(false)

  const {
    done,
    hasPayedAdvancedDeposit,
    onChange,
    form: appointment,
  } = useForm<AppointmentWithoutId>({
    client: '',
    price: 0,
    day: new Date(),
    hours: 0,
    clientContact: '',
    description: '',
    done: false,
    hasPayedAdvancedDeposit: false,
    advancedDepositAmount: 0,
  })

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDate(false)
    if (selectedDate) {
      const date = dayjs(
        `${selectedDate.toISOString().split('T')[0]}T${appointment.day.toISOString().split('T')[1]}`
      ).toDate()

      onChange({ ...appointment, day: date }, 'day')
    }
  }

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    setShowTime(false)
    if (selectedTime) {
      const date = dayjs(appointment.day)
        .set('hour', selectedTime.getHours())
        .set('minutes', selectedTime.getMinutes())
        .toDate()

      onChange({ ...appointment, day: date }, 'day')
    }
  }
  console.log({ appointment })

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <TextInput style={{ ...styles.input, borderColor: colors.primary }} placeholder='Cliente' />

      <TextInput
        style={{ ...styles.input, borderColor: colors.primary }}
        keyboardType='numeric'
        placeholder='Precio'
      />

      <View
        onTouchStart={() => setShowDate(true)}
        style={{ ...styles.dateContainer, borderColor: colors.primary }}
      >
        <Text>Fecha</Text>
      </View>
      {showDate && (
        <DateTimePicker
          testID='dateTimePicker'
          is24Hour={true}
          mode='date'
          value={new Date()}
          onChange={onChangeDate}
        />
      )}
      <View
        onTouchStart={() => setShowTime(true)}
        style={{ ...styles.dateContainer, borderColor: colors.primary }}
      >
        <Text>Hora</Text>
      </View>
      {showTime && (
        <DateTimePicker
          testID='dateTimePicker'
          is24Hour={true}
          mode='time'
          value={new Date()}
          onChange={onChangeTime}
        />
      )}

      <TextInput style={{ ...styles.input, borderColor: colors.primary }} placeholder='Descripción' />
      <TextInput style={{ ...styles.input, borderColor: colors.primary }} placeholder='Contacto de Cliente' />
      <View style={styles.switchContainer}>
        <Text>Seña</Text>
        <View style={styles.switchContainerContent}>
          <Switch
            value={hasPayedAdvancedDeposit}
            thumbColor={colors.primary}
            onValueChange={(value) => onChange(value, 'hasPayedAdvancedDeposit')}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: colors.primary,
              display: hasPayedAdvancedDeposit ? 'flex' : 'none',
              opacity: hasPayedAdvancedDeposit ? 1 : 0,
            }}
            placeholder='Cantidad'
            keyboardType='numeric'
          />
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text>Terminado</Text>
        <View style={styles.switchContainerContent}>
          <Switch
            value={done}
            onValueChange={(value) => onChange(value, 'done')}
            thumbColor={colors.primary}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: colors.primary,
              display: done ? 'flex' : 'none',
              opacity: done ? 1 : 0,
            }}
            placeholder='Horas'
            keyboardType='numeric'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    maxWidth: 180,
    width: '100%',
  },
  dateContainer: {
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    maxWidth: 180,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  switchContainer: {
    display: 'flex',
    width: '100%',
  },
  switchContainerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
  },
})
