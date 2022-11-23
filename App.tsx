import { NavigationContainer } from '@react-navigation/native'
import { Main } from './src/navigators/Main'

import { LocaleConfig } from 'react-native-calendars'
import { ThemeProvider } from './src/context/themeContext/ThemeContext'

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abril',
    'Mayo',
    'Jun.',
    'Jul.',
    'Agos.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
  today: 'Hoy',
}
LocaleConfig.defaultLocale = 'es'

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
