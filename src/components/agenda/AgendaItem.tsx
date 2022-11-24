import { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AgendaEntry } from 'react-native-calendars'
import { MainStackParamList } from '../../navigators/Main'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

interface Props {
  item: AgendaEntry
  isFirst: boolean
  navigation: NativeStackNavigationProp<MainStackParamList, 'Home', undefined>
}

export const AgendaItem = ({ item, isFirst, navigation }: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const parseNumberToHour = (number: number): string => {
    const stringHour = number.toString()
    const hasDecimal = stringHour.includes('.')
    let hour: string;
    
    if(hasDecimal){
      hour = `${stringHour.split('.')[0]}:${stringHour.split('.')[1]}`
      if(hour.length === 4) {
        hour+= '0'
      }
    } else {
      hour = `${stringHour}:00`
    }
    return hour;
  }

  parseNumberToHour(item.height)

  return (
    <TouchableOpacity
      style={{ ...styles.item, backgroundColor: colors.background }}
      onPress={() => navigation.navigate('Appointment')}
    >
      <Text style={{ ...styles.height, color: colors.text }}>{parseNumberToHour(item.height)}hs</Text>
      <Text style={{ ...styles.itemText, color: colors.text }}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  height: { fontSize: 20, marginRight: 10 },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
})
