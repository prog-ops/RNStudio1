import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import StoreManager from './src/configs/StoreManager';

const store = StoreManager();

const Application = () => (
  <Provider store={store}>
    {/*<Aplikasi />*/}
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Application);
