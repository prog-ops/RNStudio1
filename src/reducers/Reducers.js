import { FETCH_LOCATIONS_ERROR, FETCHING, GOT_LOCATIONS } from '../Constants'

const initialSearchState = {
  locations: [],
  isFetching: false,
  error: false,
  errorMessage: null
}

export function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        locations: [],
        isFetching: false,
        error: true,
        errorMessage: action.value
      }
    case FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case GOT_LOCATIONS:
      return {
        ...state,
        locations: action.value,
        isFetching: false,
      }
    default:
      return state
  }
}