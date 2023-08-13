import {View, Text} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {colorSelector, getRandomColor} from '../Utils/ColorSelector';

const Tag = ({
  content,
  disabled,
  color,
}: {
  content: 'low' | 'medium' | 'high' | 'random' | string;
  disabled?: Boolean;
  color?: string | undefined;
}) => {
  return (
    <View
      style={{
        backgroundColor: disabled
          ? '#D9D9D9'
          : color === 'random'
          ? getRandomColor()
          : colorSelector(content),
      }}
      className={` w-max px-2 py-[3] rounded-md mr-2`}>
      <Text
        className={`uppercase text-${
          disabled ? '[#646464]' : 'white'
        } font-bold text-[10px]`}>
        {content}
      </Text>
    </View>
  );
};

export default memo(Tag);
