import { StyleSheet, View } from 'react-native';
import { Agenda } from '../components';
import { HomeScreenRouteProp } from '../navigators/Main';

export const HomeScreen = ({ navigation }: HomeScreenRouteProp) => {
  return (
    <View style={styles.container}>
      <Agenda navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1}
});
