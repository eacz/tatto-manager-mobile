import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Agenda as AgendaComponent, AgendaSchedule, DateData } from 'react-native-calendars'
import dayjs from 'dayjs'
import { AgendaItem, NoAppointment } from './index'
import { MainStackParamList } from '../../navigators/Main'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { useAppSelector } from '../../hooks/redux'

const minDate = dayjs().subtract(1, 'year').toISOString()
const maxDate = dayjs().add(1, 'year').toISOString()

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Home'>
}

export const Agenda = ({ navigation }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().toISOString().split('T')[0])
  const { agenda } = useAppSelector((state) => state.appointment)
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const onDayPress = (date: DateData) => {
    setSelectedDate(formatDate(dayjs(date.dateString).toDate()))
    navigation.navigate('Appointment')
  }

  const formatDate = (date: Date | string) =>
    typeof date === 'object' ? date.toISOString().split('T')[0] : dayjs(date).toISOString().split('T')[0]

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <AgendaComponent
        items={agenda}
        onDayChange={onDayPress}
        
        renderEmptyData={() => <NoAppointment />}
        renderItem={(item, isFirst) => <AgendaItem item={item} isFirst={isFirst} navigation={navigation} />}
        
        testID='mainAgenda'
        minDate={minDate}
        maxDate={maxDate}
        current={selectedDate}
        selected={selectedDate}
        displayLoadingIndicator={false}
        showClosingKnob={true}
        showOnlySelectedDayItems={true}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          agendaDayNumColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          agendaDayTextColor: colors.primary,
          agendaKnobColor: colors.primary,
          agendaTodayColor: colors.primary,
          todayBackgroundColor: colors.background,
          monthTextColor: colors.text,
          dayTextColor: colors.text,
        }}
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
