import React, {useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/Navigation/Router';

import {requestUserPermission} from './src/Utils/NotificationServices';
import {Provider} from 'react-redux';
import {store} from './src/Store';
import ToastNotification from './src/Components/ToastNotification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
        <ToastNotification/>
      </SafeAreaProvider>
    </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
