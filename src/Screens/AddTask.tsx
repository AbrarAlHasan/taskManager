import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
type NavigationProps = NativeStackNavigationProp<MainStackParamList>;

const AddTask = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl font-bold text-red-500">Add Task</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProjectDetails');
          }}>
          <Text>ProjectDetails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;
