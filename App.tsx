import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Router from './src/Navigation/Router';
import {AuthContext, AuthProvider} from './src/Context/AuthContext/AuthContext';
import Router from './src/Navigation/Router';

import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from './src/Utils/NotificationServices';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
