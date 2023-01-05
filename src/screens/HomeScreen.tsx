import { StyleSheet, View } from 'react-native'
import { Agenda } from '../components'

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Agenda />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
