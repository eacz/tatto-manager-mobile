import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Agenda as AgendaComponent, DateData } from 'react-native-calendars'
import dayjs from 'dayjs'
import { NoAppointment } from './index'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setSelectedDay } from '../../store/appointments/slice'
import { Appointments } from '../appointment'

const minDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD')
const maxDate = dayjs().add(1, 'year').format('YYYY-MM-DD')

const currentDate = dayjs().format('YYYY-MM-DD')

export const Agenda = () => {
  const { agenda, selectedDay } = useAppSelector((state) => state.appointment)
  const dispatch = useAppDispatch()

  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const onDayPress = (date: DateData) => {
    dispatch(setSelectedDay(dayjs(date.dateString).toDate()))
  }

  const selectedDate = dayjs(selectedDay).format('YYYY-MM-DD')

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={{ ...styles.calendarContainer }}>
        <AgendaComponent
          onDayPress={onDayPress}
          renderEmptyData={() => <NoAppointment />}
          testID='mainAgenda'
          minDate={minDate}
          maxDate={maxDate}
          current={currentDate}
          selected={selectedDate}
          selectedDay={selectedDate}
          items={agenda}
          showClosingKnob={true}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            todayBackgroundColor: colors.background,
            monthTextColor: colors.text,
            dayTextColor: colors.text,

            selectedDayBackgroundColor: colors.primary,
            agendaDayNumColor: colors.primary,
            agendaDayTextColor: colors.primary,
            agendaKnobColor: colors.primary,
            agendaTodayColor: '#ff0099',
          }}
        />
      </View>
      <Appointments />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  calendarContainer: {
    height: 100,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
})
