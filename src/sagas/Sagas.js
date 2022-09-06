import { takeEvery, put, takeLatest, call } from 'redux-saga/effects'
import { fetchLocations } from '../apis/SearchAPI'
import { GOT_LOCATIONS, FETCH_LOCATIONS_ERROR, GET_LOCATIONS } from '../Constants'

function* getLocations(action) {
  yield put({ type: 'FETCHING' })
  try {
    const data = yield call(fetchLocations, action.value)
    yield put({ type: GOT_LOCATIONS, value: data.predictions })
  } catch (e) {
    yield put({ type: FETCH_LOCATIONS_ERROR, value: 'Error getiing locations' })
  }
}

export function* rootSaga() {
  yield takeEvery(GET_LOCATIONS, getLocations)
}