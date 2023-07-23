import {View, Text} from 'react-native';
import React from 'react';
import HomeIcon from '../Assets/HomeIcon.svg';
import CircularProgress from './CircularProgress';

const Card = () => {
  return (
    <View className="w-full h-24 bg-white rounded-lg shadow-sm shadow-gray-300 px-5 py-3 flex-row justify-center mb-3">
      <View className="flex-1 ">
        <Text className="font-bold text-xl">Design UI Management</Text>
        <Text className="font-light text-xs">Owned by - Abrar AL Hasan</Text>
      </View>
      <CircularProgress size={0.7} />
    </View>
  );
};

export default Card;
