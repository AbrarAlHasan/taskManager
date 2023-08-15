import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../Screens/Dashboard';
import ProjectDetails from '../Screens/ProjectDetails';
import TaskDetails from '../Screens/TaskDetails';
import AddTask from '../Screens/AddTask';
import {MainStackParamList} from './types';
// import BottomTabBar from './BottomTabNavigator';
import AddProject from '../Screens/AddProject';
import BottomTabBar from './BottomTabNavigator';
import StartUp from '../Screens/StartUp';
import AuthStack from './AuthStack';

const MainStack = () => {
  const Stack = createStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen component={StartUp} name="StartUp" /> */}
      {/* <Stack.Screen component={AuthStack} name="AuthStack" /> */}
      <Stack.Screen component={BottomTabBar} name="BottomBar" />
      <Stack.Screen component={Dashboard} name="Dashboard" />
      <Stack.Screen component={TaskDetails} name="TaskDetails" />
      <Stack.Screen component={ProjectDetails} name="ProjectDetails" />
      <Stack.Screen component={AddTask} name="AddTaskN" />
      <Stack.Screen component={AddProject} name="AddProject" />
    </Stack.Navigator>
  );
};

export default MainStack;
