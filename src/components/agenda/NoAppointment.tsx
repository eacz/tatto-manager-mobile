import { StyleSheet, Text, View } from 'react-native';

export const NoAppointment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No hay turnos hoy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'flex-start',},
  text: { fontSize: 20, marginTop: 20},
});
