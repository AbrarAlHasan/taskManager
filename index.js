/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging';
import {CommonActions} from '@react-navigation/native';
import {notificationListener} from './src/Utils/NotificationListener';

messaging().setBackgroundMessageHandler(async remoteMessage => {});

AppRegistry.registerComponent(appName, () => App);
