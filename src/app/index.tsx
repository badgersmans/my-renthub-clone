import { FlatList, Text, View } from 'react-native';
import properties from '@assets/data/property.json'
import PropertyListItem from '@/components/PropertyListItem';

export default function App() {
  return (
    <FlatList
      data={properties}
      renderItem={({item}) => (
        <PropertyListItem property={item}/>
      )}
      contentContainerStyle={{gap: 10}}
    />
  );
}