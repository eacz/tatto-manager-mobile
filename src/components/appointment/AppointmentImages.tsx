import { View, StyleSheet, Modal } from 'react-native'
import { AppointmentImage } from '.'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useState } from 'react'
import { Button } from '../UI/Button'
interface Props {
  images: string[]
}

const AppoinmentImages = ({ images }: Props) => {
  const [showZoomImage, setShowZoomImage] = useState(false)

  const closeModal = () => {
    setShowZoomImage(false)
    return null
  }
  //TODO: improve back button
  return (
    <View style={styles.container}>
      {images.map((image) => (
        <AppointmentImage key={image} image={image} setShowZoomImage={setShowZoomImage} />
      ))}
      <Modal visible={showZoomImage} transparent={true}>
        <ImageViewer
          imageUrls={images.map((image) => ({ url: image }))}
          saveToLocalByLongPress={true}
          renderFooter={() => <Button text='atras' onPress={closeModal} />}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
})

export default AppoinmentImages
