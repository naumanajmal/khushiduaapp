import * as Location from 'expo-location';

export async function getLocationCoordinates() {
  if (Platform.OS != 'ios') {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    } else {
      let coords = await Location.getCurrentPositionAsync({});
      if (coords) {
        return {
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
          timestamp: new Date(coords.timestamp),
        };
      }
    }
  }
}
