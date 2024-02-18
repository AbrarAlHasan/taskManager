import React, {useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/Navigation/Router';

import {
  requestPermission,
  requestUserPermission,
} from './src/Utils/NotificationServices';
import {Provider} from 'react-redux';
import {store} from './src/Store';
import ToastNotification from './src/Components/ToastNotification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {notificationListener} from './src/Utils/NotificationListener';
import {CommonActions} from '@react-navigation/native';
import {RealmProvider} from '@realm/react';
import {Task} from './src/Schema/Task';
import { Comments } from './src/Schema/Comments';

const App = () => {
  useEffect(() => {
    requestPermission();
    requestUserPermission();
    notificationListener();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        PushNotification.localNotification({
          channelId: 'TaskManager',
          message: remoteMessage?.notification?.body || '',
          priority: 'high',
          ignoreInForeground: false,
          vibrate: true,
          playSound: true,
          title: 'Hello',
        });

        PushNotification.configure({
          onNotification: notification => {
            console.log('Clicked the Internal Push Notification');
            CommonActions.reset({
              index: 2,
              routes: [{name: 'Dashboard'}, {name: 'Messaging'}],
            });
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RealmProvider schema={[Task,Comments]}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Router />
            <ToastNotification />
          </SafeAreaProvider>
        </Provider>
      </RealmProvider>
    </GestureHandlerRootView>
  );
};

export default App;
