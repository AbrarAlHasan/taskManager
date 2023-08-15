import React, {useContext, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Router from './src/Navigation/Router';
import {AuthContext, AuthProvider} from './src/Context/AuthContext/AuthContext';
import ProjectDetails from './src/Screens/ProjectDetails';
import AddTask from './src/Screens/AddTask';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Navigation/Router';

import {Text, View} from 'react-native';

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
