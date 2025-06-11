import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import { useRef } from 'react'
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ImageCarouselProps = {
  images: [string],
  tags: [string]
}

export default function ImageCarousel({images, tags}: ImageCarouselProps) {
  // Carousel setup
  const width = Dimensions.get("window").width;
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View>
      {/* Carousel */}
      <Carousel
        ref={ref}
        width={width}
        height={width / 2}
        data={images}
        onProgressChange={progress}
        containerStyle={{
          // backgroundColor: 'red',
          borderRadius: 12,
          // padding: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        renderItem={({ index }) => (
          <>
            <Text
            className={`
            bg-red-600
            absolute
            z-10
            self-start
            p-1
            px-2
            rounded-md
            text-white
            text-sm
            font-semibold
            capitalize
            top-4
            left-8
            `}
            >
              {tags[index]}
            </Text>
            <TouchableOpacity className='absolute z-10 top-4 right-8'>
                <FontAwesome name="heart-o" size={26} color="#525252" />
            </TouchableOpacity>
            <Image source={{uri: images[index]}} className='rounded-xl' style={{width, height: width / 2, paddingHorizontal: 10}} />
          </>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={images}
        dotStyle={{  width: 7, height: 7, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 50 }}
        activeDotStyle={{backgroundColor: "white"}}
        containerStyle={{ gap: 5, marginTop: -10 }}
        onPress={onPressPagination}
      />
    </View>
  )
}