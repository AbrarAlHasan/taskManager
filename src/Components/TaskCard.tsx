import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import CircularProgress from './CircularProgress';
import ClockIcon from '../Assets/ClockIcon.svg';
import TagShape from '../Assets/TagShape.svg';
import Tag from './Tag';
import {ITaskDetails} from '../Screens/@Types';
import {formatDateTimeTimezone} from '../Utils/FormatDateTime';
import {colorSelector} from '../Utils/ColorSelector';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';

type ProjectDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'TaskDetails'
>;

const TaskCard = (props: any) => {
  const taskDetails: ITaskDetails = props?.data;
  const dateBreached =
    new Date(taskDetails?.endDate) < new Date() && taskDetails?.progress < 100
      ? true
      : false;

  const navigation = useNavigation<ProjectDetailsScreenNavigationProp>();

  return (
    <>
      {taskDetails && (
        <Pressable
          id={props.key}
          onPress={() => {
            navigation.navigate('TaskDetails', {taskId: taskDetails?._id});
          }}
          key={taskDetails?._id}
          style={{backgroundColor: colorSelector(taskDetails?.priority)}}
          className={`w-full rounded-lg shadow-sm shadow-gray-300  flex-row justify-end mb-3 relative`}>
          <View className="h-full w-[96%] bg-white px-5 py-3 rounded-r-lg">
            <View className="flex-1 flex-row">
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text numberOfLines={1} className="font-bold text-xl mr-3">
                    {taskDetails?.name}
                  </Text>
                </View>
                <View className="flex-row my-1">
                  <Tag content={taskDetails?.priority} />
                </View>
                <View className="flex-row items-center gap-1">
                  <ClockIcon />
                  <Text className="font-light text-xs">
                    {formatDateTimeTimezone(taskDetails?.endDate)}
                  </Text>
                </View>
              </View>
              <CircularProgress
                labelNumber={taskDetails?.progress + '%'}
                total={100}
                current={taskDetails?.progress}
                size={0.8}
              />
            </View>
            {taskDetails?.assignedTo?.name && (
              <View className="flex-row-reverse items-center gap-1 mt-3 ">
                <Tag
                  content={taskDetails?.assignedTo?.name}
                  classStyle="text-[12px]"
                />
              </View>
            )}
          </View>
          {dateBreached && (
            <View className="absolute right-0 top-0">
              <TagShape />
              <Text className="uppercase font-bold text-white text-[7px] top-[3px] left-2 absolute">
                Date Breached
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </>
  );
};

export default TaskCard;
