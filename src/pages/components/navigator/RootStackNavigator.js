import React from "react";
import { createStackNavigator } from "react-navigation";
import withSafeArea from "../container/SafeArea";
import HomeScreen from './HomeTabNavigator';
import DetailsScreen from '../../news-details';
import AboutScreen from '../../about';

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: withSafeArea(DetailsScreen)
  },
  About: {
    screen: withSafeArea(AboutScreen)
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
