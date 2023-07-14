import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const TaskDetails = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl font-bold text-red-500">Task Details</Text>
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
            navigation.navigate('AddTask');
          }}>
          <Text>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetails;
