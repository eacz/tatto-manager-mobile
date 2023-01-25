import { View, Button as RNButton } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext/ThemeContext'

interface Props {
  text: string
  onPress?: () => void
}

export const Button = ({ text, onPress }: Props) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext)
  return (
    <View>
      <RNButton testID='UIButton' onPress={onPress} color={colors.primary} title={text} />
    </View>
  )
}
