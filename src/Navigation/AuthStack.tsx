import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import ForgotPass from '../Screens/ForgotPass';
import ResetPass from '../Screens/ResetPass';
import Otp from '../Screens/Otp';
import {AuthStackParamList} from './types';

const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="OTP" component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
