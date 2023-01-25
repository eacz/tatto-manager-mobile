import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
  image: string
}

const AppointmentImage = ({ image }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image, width: 60, height: 60 }} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginRight: 10
    }
});

export default AppointmentImage
