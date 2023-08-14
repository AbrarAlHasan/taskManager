import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import AuthStack from './AuthStack';
import ProjectDetails from '../Screens/ProjectDetails';
import AddTask from '../Screens/AddTask';
import AddProject from '../Screens/AddProject';

const Router = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
