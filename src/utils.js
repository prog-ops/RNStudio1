import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const GOOGLE_API_KEY = 'AIzaSyDSKsr1WK1DcCmD49tsJ1nZMgKT8RJC9EE'
export const GOOGLE_AUTO_COMPLETE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.02;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INITIAL_POSITION = {
  latitude: 40.7676,
  longitude: -75.9797,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
