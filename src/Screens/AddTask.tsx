import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tag from '../Components/Tag';

type NavigationProps = NativeStackNavigationProp<MainStackParamList>;

const AddTask = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="w-full items-center justify-center flex-row">
          <Text className="text-lg font-bold">Add Task</Text>
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-2 mb-3">
            <Text className="font-bold">Task Title</Text>
            <TextInput
              placeholder="Task Title"
              className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
            />
          </View>

          {/* Description */}
          <View className="gap-2 mb-3">
            <Text className="font-bold">Description</Text>
            <TextInput
              multiline={true}
              placeholder="Task Title"
              className="w-full bg-[#e8e4e4] h-32 rounded-md px-3"
            />
          </View>
          {/* Date  */}
          <View className="flex-row gap-3">
            <View className="mb-3 flex-1">
              <Text className="font-bold mb-2">Start Date</Text>
              <TextInput
                placeholder="Start Date"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
              />
            </View>
            <View className="mb-3 flex-1">
              <Text className="font-bold mb-2">End Date</Text>
              <TextInput
                placeholder="End Date"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
              />
            </View>
          </View>
          {/* Assigned To */}
          <View className="gap-2 mb-3">
            <Text className="font-bold">Assigned To</Text>
            <TextInput
              placeholder="Assigned To"
              className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
            />
          </View>
          {/* Priority */}
          <View className="gap-2 mb-3">
            <Text className="font-bold">Priority</Text>
            <View className="flex-row ">
              <Tag content={'low'} />
              <Tag content={'medium'} />
              <Tag content={'high'} />
            </View>
          </View>

          {/* Project */}
          <View className="gap-2 mb-3">
            <Text className="font-bold">Project</Text>
            <TextInput
              placeholder="Project"
              className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTask;
