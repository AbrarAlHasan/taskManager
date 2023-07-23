import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {useNavigation} from '@react-navigation/native';

const TaskList = () => {
  const tasks = [23, 43, 24, 32, 4, 34, 3, 32];
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks?.map(() => (
          <TouchableOpacity onPress={() => navigation.navigate('TaskDetails')}>
            <TaskCard />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskList;
