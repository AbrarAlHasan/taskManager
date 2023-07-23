import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Tag from '../Components/Tag';

const TaskDetails = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="flex-row items-center justify-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="font-bold text-lg">{'<'}</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center font-bold text-lg">
          {'Task Details'}
        </Text>
        <Text className="font-bold text-lg">{'...'}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        className="gap-3">
        <View>
          <Text className="text-2xl font-bold">Design Firmware</Text>
        </View>
        {/* Progress Bar */}
        <View className=" flex-row">
          <View className="flex-1">
            <Text className="font-light text-[12px]">Progress</Text>
            <View className=" flex-row items-center gap-4">
              <View className="w-40 bg-[#E6E6E6] h-2 rounded-md ">
                <View className="w-[40%] h-full bg-[#18B797] rounded-md"></View>
              </View>
              <Text className="font-bold">50%</Text>
            </View>
          </View>
          <View className="items-center justify-center gap-1">
            <Text className="font-bold uppercase text-[#777676] text-[12px]">
              Due On
            </Text>
            <View className="bg-[#DF3745] rounded-md px-1 py-1">
              <Text className="font-bold text-white text-[13px]">
                23-Feb-2023
              </Text>
            </View>
          </View>
        </View>
        {/* Assigned to */}
        <View className="flex-row">
          <Text className="w-32 font-light">Assigned to</Text>
          <Text className="font-semi-bold">Abrar Al Hasan</Text>
        </View>
        {/* Created At */}
        <View className="flex-row">
          <Text className="w-32 font-light">Created At</Text>
          <Text className="font-semi-bold">22-Jan-2023</Text>
        </View>
        {/* Priority */}
        <View className="flex-row">
          <Text className="w-32 font-light">Priority</Text>
          <Tag content="high" />
        </View>
        {/* Description */}
        <View>
          <Text className="font-bold text-lg mb-2">Description</Text>
          <Text className="font-light text-[14px] text-[#646464]">
            Our project involves the creation of a landing page for our website.
            The landing page will serve as the main entry point for visitors to
            our site, and it should be designed to convert these visitors into
            customers.
          </Text>
        </View>
        {/* Task History */}
        <View>
          <Text className="font-bold text-lg mb-2">Task History</Text>
          <View className="flex-row">
            <View className="rounded-full bg-gray-500 w-3 h-3 mt-[3.5px] mr-3"></View>
            <View className="gap-1">
              <Text className="font-bold">Abrar Al Hasan</Text>
              <Text className="font-light  text-[12px] text-gray-400">
                01-Feb-2023
              </Text>
              <Text className="font-light text-[14px] text-[#646464]">
                Changed the End Date
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetails;
