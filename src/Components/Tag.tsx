import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

const Tag = ({content}: {content: 'low' | 'medium' | 'high'}) => {
  const colorSelector = () => {
    switch (content.toLocaleLowerCase()) {
      case 'high':
        return '#F3737E';
      case 'medium':
        return '#F9AA4B';
      case 'low':
        return '#18B797';
      default:
        return '#18B797';
    }
  };

  return (
    <View
      style={{backgroundColor: colorSelector()}}
      className={` w-max px-2 py-[3] rounded-md mr-2`}>
      <Text className="uppercase text-white font-bold text-[10px]">
        {content}
      </Text>
    </View>
  );
};

export default Tag;
