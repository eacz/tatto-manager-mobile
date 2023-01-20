import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { HomeScreen, AppointmentScreen, LoadingScreen } from '../screens'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getTattoos } from '../store/appointments/actions'
import { Appointment } from '../store/appointments/types'
import { Button } from '../components/UI/Button'
import { RouteProp, useNavigation } from '@react-navigation/native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

export type MainStackParamList = {
  Home: undefined
  Loading: undefined
  Appointment: { isNew: boolean; appointment?: Appointment }
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export type HomeScreenRouteProps = RouteProp<MainStackParamList, 'Home'>
export type AppointmentScreenRouteProps = RouteProp<MainStackParamList, 'Appointment'>

export const Main = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  const loading = useAppSelector((state) => state.appointment.loading)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(getTattoos())
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
      }}
    >
      {loading ? (
        <Stack.Screen options={{ headerShown: false }} name='Loading' component={LoadingScreen} />
      ) : (
        <>
          <Stack.Screen
            options={{
              title: 'Inicio',
              headerRight: () => (
                <Button
                  text='Nuevo turno'
                  onPress={() => navigation.navigate('Appointment', { isNew: true })}
                />
              ),
            }}
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen options={{ title: 'Turno' }} name='Appointment' component={AppointmentScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}
