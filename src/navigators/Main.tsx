import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {Home, Appointment} from '../screens';

export type MainStackParamList = {
  Home: undefined,
  Appointment: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>();

export type HomeScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Home'>
export type AppointmentScreenRouteProp = NativeStackScreenProps<MainStackParamList, 'Appointment'>

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Appointment" component={Appointment} />
    </Stack.Navigator>
  );
};

export default Main;
