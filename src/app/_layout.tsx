import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native'
import { darkTheme, lightTheme } from '@/colors/theme';
import { useColorScheme } from 'react-native';
import '../../global.css'

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider value={theme}>
      <StatusBar />
      <Stack />
    </ThemeProvider>
  )
}