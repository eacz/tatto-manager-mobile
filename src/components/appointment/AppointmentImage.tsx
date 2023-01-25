import { View, Image, StyleSheet } from 'react-native'

interface Props {
  image: string
  setShowZoomImage: (show: boolean) => void
}

const AppointmentImage = ({ image, setShowZoomImage }: Props) => {
  return (
    <View style={styles.container} onTouchStart={() => setShowZoomImage(true)}>
      <Image source={{ uri: image, width: 60, height: 60 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
})

export default AppointmentImage
