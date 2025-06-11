import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native'
import { darkTheme, lightTheme } from '@/colors/theme';
import { useColorScheme } from 'react-native';
import '../../global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider value={theme}>
      <StatusBar />
      <GestureHandlerRootView>
        <Stack screenOptions={{headerShown: false}}/>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}