import { View, Text } from 'react-native'
import ImageCarousel from './ImageCarousel'

type PropertyListItemProps = {
  property: {
    name: string,
    location: {
      subdistrict: string,
      district: string,
      province: string
    },
    images: [string],
    priceRange: {
      min: number,
      max: number,
      currency: string,
      billingCycle: string
    },
    tags: [string]
  }
}

export default function PropertyListItem({property}: PropertyListItemProps) {
  const {district, subdistrict, province} = property.location
  const {min, max} = property.priceRange

  return (
    <View className='bg-white p-3 gap-3'>
      <ImageCarousel images={property.images} tags={property.tags}/>

      {/* Property Info */}
      <Text className='font-semibold text-md'>{property.name}</Text>
      <Text className='text-gray-500'>{`${district} ${subdistrict} ${province}`}</Text>
      <Text className='text-blue-600 font-semibold'>{`฿${min} - ฿${max} /Monthly`}</Text>
    </View>
  )
}