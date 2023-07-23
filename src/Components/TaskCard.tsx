import {View, Text} from 'react-native';
import React from 'react';
import CircularProgress from './CircularProgress';
import ClockIcon from '../Assets/clockIcon.svg';
import TagShape from '../Assets/TagShape.svg';
import Tag from './Tag';

const TaskCard = () => {
  return (
    <View className="w-full h-24 bg-red-500 rounded-lg shadow-sm shadow-gray-300  flex-row justify-end mb-3 relative">
      <View className="h-full w-[96%] flex-row bg-white px-5 py-3 rounded-r-lg">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="font-bold text-xl mr-3">Design Firmware</Text>
            <Tag content={'High'} />
          </View>
          <View className="flex-row items-center gap-1">
            <ClockIcon />
            <Text className="font-light text-xs">23-Mar-2023</Text>
          </View>
        </View>
        <CircularProgress size={0.7} />
      </View>
      <View className="absolute right-0 top-0">
        <TagShape />
        <Text className="uppercase font-bold text-white text-[7px] top-[3px] left-2 absolute">
          Date Breached
        </Text>
      </View>
    </View>
  );
};

export default TaskCard;
