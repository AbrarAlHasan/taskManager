import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {useNavigation, CommonActions} from '@react-navigation/native';

const StartUp = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // The index of the new screen you want to navigate to
        routes: [{name: 'Dashboard'}], // The name of the new screen component
      }),
    );
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
