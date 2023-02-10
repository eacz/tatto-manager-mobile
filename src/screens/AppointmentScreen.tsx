import { useContext, useState } from 'react'
import { Alert, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import { Asset, launchImageLibrary } from 'react-native-image-picker'

import { ThemeContext } from '../context/themeContext/ThemeContext'
import { Appointment } from '../store/appointments/types'
import useForm from '../hooks/useForm'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppointmentScreenRouteProps } from '../navigators/Main'
import { Button } from '../components/UI/Button'
import { useAppDispatch } from '../hooks/redux'
import { createTattoo, deleteTattoo, updateTattoo } from '../store/appointments/actions'
import { AppointmentImages } from '../components/appointment'

export const AppointmentScreen = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  const [showTime, setShowTime] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [images, setImages] = useState<Asset[] | undefined>([])
  const {
    params: { isNew, appointment: propAppointment },
  } = useRoute<AppointmentScreenRouteProps>()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const initialState = propAppointment
    ? propAppointment
    : {
        _id: '',
        client: '',
        price: 0,
        day: new Date(),
        hours: 0,
        clientContact: '',
        description: '',
        done: false,
        hasPayedAdvancedDeposit: false,
        advancedDepositAmount: 0,
      }
  const {
    done,
    hasPayedAdvancedDeposit,
    client,
    price,
    description,
    clientContact,
    advancedDepositAmount,
    hours,
    day,
    onChange,
    form: appointment,
  } = useForm<Appointment>(initialState)

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDate(false)
    if (selectedDate) {
      const currentDate = dayjs(day).toDate()

      const date = dayjs(
        `${selectedDate.toISOString().split('T')[0]}T${currentDate.toISOString().split('T')[1]}`
      )

      onChange(date, 'day')
    }
  }

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    setShowTime(false)
    if (selectedTime) {
      const currentDate = dayjs(day).toDate()

      const date = dayjs(
        `${currentDate.toISOString().split('T')[0]}T${selectedTime.toISOString().split('T')[1]}`
      )

      onChange(date, 'day')
    }
  }

  const SaveAppointment = () => {
    if (isNew) {
      dispatch(createTattoo({ appointment, images }))
    } else {
      dispatch(updateTattoo(appointment))
    }
    navigation.navigate('Home')
  }

  const selectImages = async () => {
    await launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (res) => {
      if (res && !res.didCancel) {
        setImages(res.assets)
      }
    })
  }

  const deleteAppointment = () => {
    if (appointment._id) {
      const id = appointment._id
      Alert.alert('Estas segura de eliminar este turno?', 'Esta acción no es reversible', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(deleteTattoo(id))
            if (navigation.canGoBack()) {
              navigation.goBack()
            }
          },
        },
      ])
    }
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <TextInput
        style={{ ...styles.input, borderColor: colors.primary }}
        value={client}
        onChangeText={(value) => onChange(value, 'client')}
        placeholder='Cliente'
      />
      <TextInput
        style={{ ...styles.input, borderColor: colors.primary }}
        keyboardType='numeric'
        placeholder='Precio'
        value={String(price)}
        onChangeText={(value) => onChange(Number(value), 'price')}
      />
      <View
        onTouchStart={() => setShowDate(true)}
        style={{ ...styles.dateContainer, borderColor: colors.primary }}
      >
        <Text>{dayjs(day).format('DD/MM')}</Text>
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
        <Text>{dayjs(day).format('HH:mm')}</Text>
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
      <TextInput
        style={{ ...styles.input, borderColor: colors.primary }}
        value={description}
        onChangeText={(value) => onChange(value, 'description')}
        placeholder='Descripción'
      />
      <TextInput
        style={{ ...styles.input, borderColor: colors.primary }}
        value={clientContact}
        onChangeText={(value) => onChange(value, 'clientContact')}
        placeholder='Contacto de Cliente'
      />
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
              marginBottom: 20,
            }}
            placeholder='Cantidad'
            keyboardType='numeric'
            value={String(advancedDepositAmount)}
            onChangeText={(value) => onChange(Number(value), 'advancedDepositAmount')}
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
              marginBottom: 20,
            }}
            placeholder='Horas'
            keyboardType='numeric'
            value={String(hours)}
            onChangeText={(value) => onChange(Number(value), 'hours')}
          />
        </View>
      </View>
      {appointment.images && <AppointmentImages images={appointment.images} />}

      <View style={styles.buttonContainer}>
        <Button text='Añadir imagenes' onPress={selectImages} />
      </View>

      <View style={styles.groupButtons}>
        <View style={styles.groupButton}>
          <Button text='Guardar' onPress={SaveAppointment} />
        </View>
        <View style={styles.groupButton}>
          <Button text='Eliminar' color='#d30000' onPress={deleteAppointment} />
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
  buttonContainer: {
    width: '100%',
    marginTop: 50,
  },
  groupButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  groupButton: {
    width: '48%',
  },
})
