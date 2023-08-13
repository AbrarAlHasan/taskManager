import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import ProjectDetails from '../Screens/ProjectDetails';
import TaskDetails from '../Screens/TaskDetails';
import AddTask from '../Screens/AddTask';
import {MainStackParamList} from './types';
import BottomTabBar from './BottomTabNavigator';

const mainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="BottomBar"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={BottomTabBar} name="BottomBar" />
      <Stack.Screen component={TaskDetails} name="TaskDetails" />
      <Stack.Screen component={ProjectDetails} name="ProjectDetails" />
      <Stack.Screen component={AddTask} name="AddTaskN" />
    </Stack.Navigator>
  );
};

export default mainStack;
