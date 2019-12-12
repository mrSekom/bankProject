import React, {Component} from 'react';
import AppNavigator from './src/AppNavigator';
require('moment/locale/tr.js');

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

console.disableYellowBox = true;