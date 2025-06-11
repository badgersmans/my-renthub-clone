import React, { useCallback, useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView, {
  Marker,
  Polygon,
  Polyline,
  Callout,
} from 'react-native-maps';
import PriceMarker from '@/components/PriceMarker';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

const Event = React.memo(({ event }: { event: any }) => {
  return (
    <View style={styles.event}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventData}>
        {JSON.stringify(event.data, null, 2)}
      </Text>
    </View>
  );
}, (prevProps, nextProps) => prevProps.event.id === nextProps.event.id);

const EventListener = ({ provider }: { provider?: any }) => {
  const [events, setEvents] = useState<any[]>([]);
  const region = useMemo(() => ({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }), []);

  const makeEvent = useCallback((e: any, name: string) => {
    return {
      id: id++,
      name,
      data: e.nativeEvent ? e.nativeEvent : e,
    };
  }, []);

  const recordEvent = useCallback((name: string) => {
    return (e: any) => {
      if (e.persist) e.persist(); // avoid synthetic event pooling
      setEvents(prev => [makeEvent(e, name), ...prev.slice(0, 10)]);
    };
  }, [makeEvent]);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeStart={recordEvent('Map::onRegionChangeStart')}
        onRegionChange={recordEvent('Map::onRegionChange')}
        onRegionChangeComplete={recordEvent('Map::onRegionChangeComplete')}
        onPress={recordEvent('Map::onPress')}
        onPanDrag={recordEvent('Map::onPanDrag')}
        onLongPress={recordEvent('Map::onLongPress')}
        onMarkerPress={recordEvent('Map::onMarkerPress')}
        onMarkerSelect={recordEvent('Map::onMarkerSelect')}
        onMarkerDeselect={recordEvent('Map::onMarkerDeselect')}
        onCalloutPress={recordEvent('Map::onCalloutPress')}
        onUserLocationChange={recordEvent('Map::onUserLocationChange')}
      >
        <Marker
          coordinate={{
            latitude: LATITUDE + LATITUDE_DELTA / 2,
            longitude: LONGITUDE + LONGITUDE_DELTA / 2,
          }}
        />
        <Marker
          coordinate={{
            latitude: LATITUDE - LATITUDE_DELTA / 2,
            longitude: LONGITUDE - LONGITUDE_DELTA / 2,
          }}
        />
        <Marker
          title="This is a title"
          description="This is a description"
          coordinate={region}
          onPress={recordEvent('Marker::onPress')}
          onSelect={recordEvent('Marker::onSelect')}
          onDeselect={recordEvent('Marker::onDeselect')}
          onCalloutPress={recordEvent('Marker::onCalloutPress')}
        >
          <PriceMarker amount={99} />
          <Callout
            style={styles.callout}
            onPress={recordEvent('Callout::onPress')}
          >
            <View>
              <Text>Well hello there...</Text>
            </View>
          </Callout>
        </Marker>
        <Polygon
          fillColor="rgba(255,0,0,0.3)"
          onPress={recordEvent('Polygon::onPress')}
          tappable
          coordinates={[
            {
              latitude: LATITUDE + LATITUDE_DELTA / 5,
              longitude: LONGITUDE + LONGITUDE_DELTA / 4,
            },
            {
              latitude: LATITUDE + LATITUDE_DELTA / 3,
              longitude: LONGITUDE + LONGITUDE_DELTA / 4,
            },
            {
              latitude: LATITUDE + LATITUDE_DELTA / 4,
              longitude: LONGITUDE + LONGITUDE_DELTA / 2,
            },
          ]}
        />
        <Polyline
          strokeColor="rgba(255,0,0,1)"
          onPress={recordEvent('Polyline::onPress')}
          tappable
          coordinates={[
            {
              latitude: LATITUDE + LATITUDE_DELTA / 5,
              longitude: LONGITUDE - LONGITUDE_DELTA / 4,
            },
            {
              latitude: LATITUDE + LATITUDE_DELTA / 3,
              longitude: LONGITUDE - LONGITUDE_DELTA / 4,
            },
            {
              latitude: LATITUDE + LATITUDE_DELTA / 4,
              longitude: LONGITUDE - LONGITUDE_DELTA / 2,
            },
          ]}
        />
      </MapView>
      <View style={styles.eventList}>
        <ScrollView>
          {events.map(event => (
            <Event key={event.id} event={event} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  eventList: {
    position: 'absolute',
    top: (2 / 3) * height,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: height / 3,
  },
  event: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
  },
  eventData: {
    fontSize: 10,
    fontFamily: 'courier',
    color: '#555',
  },
  eventName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
  },
  callout: {
    width: 60,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default EventListener;
