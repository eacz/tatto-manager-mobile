import { Theme } from '@react-navigation/native'

type actionTypes = { type: 'set_dark_theme' } | { type: 'set_light_theme' }

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark'
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
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
  h1: 60,
  h2: 50,
  h3: 40,
  h4: 30,
  h5: 20,
  h6: 15,
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
  h1: 60,
  h2: 50,
  h3: 40,
  h4: 30,
  h5: 20,
  h6: 15,
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
