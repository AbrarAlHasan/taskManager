import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = ({show}: {show: boolean}) => {
  return (
    <View
      className={`w-screen h-screen absolute top-0 left-0 ${
        show ? 'flex' : 'hidden'
      } items-center justify-center z-10 bg-white opacity-80`}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
