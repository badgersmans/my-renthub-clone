import { DarkTheme, DefaultTheme } from '@react-navigation/native'

export const darkTheme = {
  ...DarkTheme,
  colors: {
      ...DarkTheme.colors,
      background: 'orange',
      card: '#101010',
      text: '#fff',
      primary: '#fff',
      secondary: '#fff',
  }
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#111111',
    primary: '#1e40af',
    secondary: '#3b82f6',
  },
};
