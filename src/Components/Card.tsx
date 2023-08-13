import {View, Text} from 'react-native';
import React from 'react';
import HomeIcon from '../Assets/HomeIcon.svg';
import CircularProgress from './CircularProgress';
import {IProjectListType} from '../Screens/@Types';
import Tag from './Tag';

const Card = (props: any) => {
  const projectList: IProjectListType = props.data;
  return (
    <View
      key={projectList?._id}
      className="w-full bg-white rounded-lg shadow-sm shadow-gray-300 px-5 py-3 flex-row justify-center mb-3">
      <View className="flex-1 gap-2">
        <Text className="font-bold text-xl">
          {projectList?.projectDetails?.name}
        </Text>
        <View className="flex-row">
          <Tag content={projectList?.role} />
        </View>
        <Text className="font-extralight text-[13px]">
          {projectList?.projectDetails?.description}
        </Text>
      </View>
      <CircularProgress
        labelName="Tasks"
        labelNumber={`${projectList?.completedTasks}/${projectList?.totalTasks}`}
        size={0.7}
        current={projectList?.completedTasks}
        total={projectList?.totalTasks}
      />
    </View>
  );
};

export default Card;
