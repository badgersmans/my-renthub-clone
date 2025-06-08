import ThemedText from '@/components/ThemedText';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const {colors} = useTheme();

  return (
    <View className='bg-white dark:bg-black flex-1 p-1'>
      {/* <Text className='text-black dark:text-orange-400'>Open up App.tsx to start working on your app!</Text> */}
      <ThemedText className='font-semibold text-lg'>Hi</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});