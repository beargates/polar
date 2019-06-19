/**
 * StackNavigator
 */
import {createStackNavigator} from 'react-navigation';
import AboutScreen from '../../about';
import SettingScreen from '../../settings';

const routeConfig = {
  Setting: {
    screen: SettingScreen,
    navigationOptions: () => ({
      title: '设置',
      tabBarLabel: '设置'
    }),
  },
  About: {
    screen: AboutScreen,
  },
};
const navigationOptions = {};

export default createStackNavigator(routeConfig, navigationOptions);
