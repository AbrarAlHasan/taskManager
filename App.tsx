import React, {useContext, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/Navigation/Router';
import {AuthContext, AuthProvider} from './src/Context/AuthContext/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
