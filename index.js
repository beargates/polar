/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import asyncStorageConfig from './src/common/config/asyncStorage';
import {name as appName} from './app.json';

// global.storage = new Storage(asyncStorageConfig);

AppRegistry.registerComponent(appName, () => App);
