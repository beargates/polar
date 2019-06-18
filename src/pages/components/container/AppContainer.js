import React from 'react';
import { createAppContainer } from 'react-navigation'
import AppNavigator from '../navigator/TabNavigator';

const AppContainer = createAppContainer(AppNavigator);

export default class Container extends React.Component {
  render() {
    return <AppContainer/>;
  }
}