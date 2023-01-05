import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { HomeScreen, AppointmentScreen } from '../screens'
import { useAppDispatch } from '../hooks/redux'
import { getTattos } from '../store/appointments/actions'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTattos())
  }, [])
  
  useEffect(() => {})
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen options={{ title: 'Inicio' }} name='Home' component={HomeScreen} />
      <Stack.Screen options={{ title: 'Turno' }} name='Appointment' component={AppointmentScreen} />
    </Stack.Navigator>
  )
}
