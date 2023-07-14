import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import ProjectDetails from '../Screens/ProjectDetails';
import TaskDetails from '../Screens/TaskDetails';
import AddTask from '../Screens/AddTask';
import {MainStackParamList} from './types';

const mainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Dashboard} name="Dashboard" />
      <Stack.Screen component={ProjectDetails} name="ProjectDetails" />
      <Stack.Screen component={TaskDetails} name="TaskDetails" />
      <Stack.Screen component={AddTask} name="AddTask" />
    </Stack.Navigator>
  );
};

export default mainStack;
