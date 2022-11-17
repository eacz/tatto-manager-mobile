import {Button, StyleSheet, Text, View} from 'react-native';
import {HomeScreenRouteProp} from '../navigators/Main';

export const Home = ({navigation}: HomeScreenRouteProp) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="ir al turno (?"
        onPress={() => navigation.navigate('Appointment')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
