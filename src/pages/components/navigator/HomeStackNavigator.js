/**
 * StackNavigator
 */
import {StackNavigator} from 'react-navigation';
import HomeScreen from '../../home';
import NewsDetails from '../../news-details';

const routeConfig = {
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      // 设置tabBar title的三种方法 tabBarLabel优先生效，其次是title
      title: '阅读', // title还有一个作用是设置StackNavigator里navigation的title
      // tabBarLabel: '阅读',
      tabBarLabel: () => '阅读',
    }),
  },
  NewsDetails: {
    screen: NewsDetails,
  },
};
const navigationOptions = {};

export default StackNavigator(routeConfig, navigationOptions);
