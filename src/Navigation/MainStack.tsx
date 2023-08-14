import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import ProjectDetails from '../Screens/ProjectDetails';
import TaskDetails from '../Screens/TaskDetails';
import AddTask from '../Screens/AddTask';
import {MainStackParamList} from './types';
import BottomTabBar from './BottomTabNavigator';
import AddProject from '../Screens/AddProject';

const mainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="AddTask"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={BottomTabBar} name="BottomBar" />
      <Stack.Screen component={TaskDetails} name="TaskDetails" />
      <Stack.Screen component={ProjectDetails} name="ProjectDetails" />
      <Stack.Screen component={AddTask} name="AddTaskN" />
      <Stack.Screen component={AddProject} name="AddProject" />
    </Stack.Navigator>
  );
};

export default mainStack;
