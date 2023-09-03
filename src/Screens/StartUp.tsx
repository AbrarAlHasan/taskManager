import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, MainStackParamList} from '../Navigation/types';

const StartUp = () => {
  const {isAuthenticated} = useContext(AuthContext);
  console.log(isAuthenticated);
  const navigation = useNavigation<any>();
  useEffect(() => {
    navigation.removeListener;
    isAuthenticated
      ? navigation.navigate('Dashboard')
      : navigation.navigate('Login');
  }, [isAuthenticated]);
  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-5xl">TASK MANAGER</Text>
      <Text className="text-lg">Powered By</Text>
      <Text className="text-sm">Abrar Al Hasan</Text>
    </View>
  );
};

export default StartUp;
