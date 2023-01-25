import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppointmentImage } from '.'

interface Props {
  images: string[]
}

const AppoinmentImages = ({ images }: Props) => {
  return (
    <View style={styles.container}>
      {images.map((image) => (
        <AppointmentImage image={image} />
      ))}
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
