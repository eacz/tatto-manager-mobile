import { StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

export const NoAppointment = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={{ ...styles.text, color: colors.text }}>No hay turnos hoy</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%' },
  text: { fontSize: 20, marginTop: 20, fontWeight: 'bold' },
})
