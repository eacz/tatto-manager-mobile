import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext/ThemeContext';

export const NoAppointment = () => {
  const {theme: { colors }} = useContext(ThemeContext)
  
  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <Text style={{...styles.text, color: colors.text}}>No hay turnos hoy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'flex-start',},
  text: { fontSize: 20, marginTop: 20},
});
