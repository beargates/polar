import React from "react";
import { createStackNavigator } from "react-navigation";
import withSafeArea from "../container/SafeArea";
import DrawerScreen from './DrawerNavigator';
import DetailsScreen from '../../news-details';
import AboutScreen from '../../about';
import { Camera } from '../camera'

export default createStackNavigator({
  Home: {
    screen: DrawerScreen,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: withSafeArea(DetailsScreen)
  },
  About: {
    screen: withSafeArea(AboutScreen)
  },
  CameraView: {
    screen: Camera
  }
}, {
  // headerMode: 'none',
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state;
    if (routeName === 'Home') {
      return { title: 'Home' }
    }
    return { headerMode: 'none' }
  }
});
