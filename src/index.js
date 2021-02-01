import React from 'react';
import {Text, View} from 'react-native';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
