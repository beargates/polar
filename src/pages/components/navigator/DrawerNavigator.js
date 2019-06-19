import React from 'react';
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { Text, View } from 'react-native'
import HomeTabNavigator from './HomeTabNavigator'

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeTabNavigator,
  },
}, {
  contentComponent: class extends React.Component {
    render() {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>这是一个抽屉</Text>
      </View>
    }
  }
});

export default createAppContainer(MyDrawerNavigator);
