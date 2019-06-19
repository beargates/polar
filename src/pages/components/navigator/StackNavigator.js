import React from "react";
import { createStackNavigator } from "react-navigation";
import withSafeArea from "../container/SafeArea";
import HomeScreen from '../../home';
import DetailsScreen from '../../news-details';

export default createStackNavigator({
  Home: {
    screen: withSafeArea(HomeScreen)
  },
  Details: {
    screen: withSafeArea(DetailsScreen)
  }
});
