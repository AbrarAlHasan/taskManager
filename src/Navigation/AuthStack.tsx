import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import ForgotPass from '../Screens/ForgotPass';
import ResetPass from '../Screens/ResetPass';
import Otp from '../Screens/Otp';
import {AuthStackParamList} from './types';
import StartUp from '../Screens/StartUp';

const AuthStack = () => {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="StartUp" component={StartUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="OTP" component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
