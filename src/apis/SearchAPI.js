import axios from 'axios';
import {GOOGLE_AUTO_COMPLETE_URL, GOOGLE_API_KEY} from '../utils';

export async function fetchLocations(string) {
  return await axios
    .get(GOOGLE_AUTO_COMPLETE_URL, {
      params: {
        input: string,
        types: 'geocode',
        key: GOOGLE_API_KEY,
      },
    })
    .then(res => res.data);
}
