import { Theme } from '@react-navigation/native'

type actionTypes = { type: 'set_dark_theme' } | { type: 'set_light_theme' }

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark'
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#de8aff',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#000000',
    notification: 'teal',
  },
}

export const darkTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  colors: {
    primary: '#de8aff',
    background: '#242424',
    card: '#242424',
    text: '#ffffff',
    border: '#ffffff',
    notification: 'teal',
  },
}

const themeReducer = (state: ThemeState, action: actionTypes): ThemeState => {
  switch (action.type) {
    case 'set_dark_theme':
      return { ...darkTheme }
    case 'set_light_theme':
      return { ...lightTheme }
    default:
      return state
  }
}

export default themeReducer
