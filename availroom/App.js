import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './react/src/redux/reducers';
import thunk from 'redux-thunk';
import {StatusBar} from 'react-native';
import HomeScreen from './react/src/screens/HomeScreen';
import WebViewScreen from './react/src/screens/WebViewScreen';

import BarCodeScannerScreen from './react/src/components/BarcodeScanner';

const store = createStore(rootReducer, applyMiddleware(thunk));

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    BarCodeScan: {
      screen: BarCodeScannerScreen,
    },
    WebView: {
      screen: WebViewScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on iOS
      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <App />
    </Provider>
  );
};
