import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { HomeScreen, AppointmentScreen } from '../screens'

export type MainStackParamList = {
  Home: undefined
  Appointment: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export type HomeScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Home'>
export type AppointmentScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Appointment'>

export const Main = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background,  },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text
      }}
    >
      <Stack.Screen options={{title: 'Inicio'}} name='Home' component={HomeScreen} />
      <Stack.Screen options={{title: 'Turno'}} name='Appointment' component={AppointmentScreen} />
    </Stack.Navigator>
  )
}
