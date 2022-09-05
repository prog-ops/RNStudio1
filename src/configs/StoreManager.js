import {createStore, applyMiddleware} from 'redux';
import app from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../sagas/Sagas';

const sagaMiddleware = createSagaMiddleware();

export default StoreManager = () => {
  const store = createStore(app, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
};
