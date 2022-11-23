import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Agenda as AgendaComponent, AgendaSchedule, DateData } from 'react-native-calendars'
import dayjs from 'dayjs'
import { AgendaItem, NoAppointment } from './index'
import { MainStackParamList } from '../../navigators/Main'

const minDate = dayjs().subtract(1, 'year').toISOString()
const maxDate = dayjs().add(1, 'year').toISOString()

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Home'>
}

export const Agenda = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().toISOString().split('T')[0])

  const onDayPress = (date: DateData) => {
    setSelectedDate(formatDate(dayjs(date.dateString).toDate()))
    navigation.navigate('Appointment')
  }

  const items: AgendaSchedule = {
    '2022-11-23': [
      { name: 'Turno - Poli', height: 11, day: new Date().toISOString() },
      { name: 'Turno - Pato', height: 14, day: new Date().toISOString() },
    ],
  }

  const formatDate = (date: Date | string) =>
    typeof date === 'object' ? date.toISOString().split('T')[0] : dayjs(date).toISOString().split('T')[0]

  return (
    <View style={styles.container}>
      <AgendaComponent
        theme={{}}
        testID='mainAgenda'
        items={items}
        minDate={minDate}
        maxDate={maxDate}
        renderItem={(item, isFirst) => <AgendaItem item={item} isFirst={isFirst} navigation={navigation} />}
        onDayChange={onDayPress}
        current={selectedDate}
        selected={selectedDate}
        showClosingKnob={true}
        displayLoadingIndicator={false}
        renderEmptyData={NoAppointment}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
})
