import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeScreen, AppointmentScreen} from '../screens';

export type MainStackParamList = {
  Home: undefined,
  Appointment: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>();

export type HomeScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Home'>
export type AppointmentScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Appointment'>

export const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
    </Stack.Navigator>
  );
};

