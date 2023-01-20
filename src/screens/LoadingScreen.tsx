import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const LoadingScreen = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ActivityIndicator color={colors.primary} size={50} />
      <Text>Cargando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
})
