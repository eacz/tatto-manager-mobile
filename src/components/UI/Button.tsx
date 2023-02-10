import { View, Button as RNButton } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

interface Props {
  text: string
  color?: string
  onPress?: () => void
}

export const Button = ({ text, onPress, color }: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  return (
    <View>
      <RNButton testID='UIButton' onPress={onPress} color={color ? color : colors.primary} title={text} />
    </View>
  )
}
