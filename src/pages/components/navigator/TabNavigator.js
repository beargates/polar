/**
 *
 */
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import withSafeArea from '../container/SafeArea'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreenStack from './StackNavigator';
import SettingsScreen from '../../settings';
// import TabBar from './TabBar';

// const addStackNavigator = StackNavigator({
//   Add: {
//     screen: NewsNewScreen,
//     navigationOptions: () => ({
//       title: '新建',
//     }),
//   }
// }, {
//   mode: 'modal',
// });
//
// const routeConfigs = {
//   Home: {
//     screen: HomeStackNavigator,
//     path: 'tabs/:name', // path属性适用于其他app或浏览器使用url打开本app并进入指定页面
//   },
//   Add: {
//     screen: addStackNavigator,
//     navigationOptions: () => ({
//       tabBarLabel: () => <Icon name="edit" size={40} color="#0c89cf"/>
//     })
//   },
//   Setting: {
//     screen: SettingStackNavigator,
//   },
// };
// const tabNavigatorConfig = {
//   // 自定义tabBar
//   // tabBarComponent: TabBar,
//   tabBarOptions: {
//     // activeTintColor: '#e91e63',
//     labelStyle: {
//       fontSize: 18,
//       lineHeight: 48,
//       justifyContent: 'center',
//     },
//     style: {
//       // backgroundColor: 'blue',
//       // justifyContent: 'center',
//     },
//   }
// };

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color}/>
        {badgeCount > 0 && (
          <View style={{
            // If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = (props) => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3}/>;
}

export default createBottomTabNavigator(
  {
    Home: HomeScreenStack,
    Settings: withSafeArea(SettingsScreen),
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
