import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Tag from '../Components/Tag';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList, TTaskDetailsParams} from '../Navigation/types';
import {ITaskDetails} from './@Types';
import {getTaskDetails} from '../axios/Tasks/tasks';
import GoBackIcon from '../Assets/GoBack.svg';
import {formatDateTimeTimezone} from '../Utils/FormatDateTime';

type TaskDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type TaskDetailsProps = {
  navigation?: TaskDetailsScreenNavigationProp;
  route?: {params: TTaskDetailsParams};
};

const TaskDetails = ({navigation, route}: TaskDetailsProps) => {
  const [taskDetails, setTaskDetails] = useState<ITaskDetails>();
  useEffect(() => {
    route &&
      (async () => {
        try {
          const response = await getTaskDetails(route?.params?.taskId);
          if (response[0] === 200) {
            console.log('response', response);
            setTaskDetails(response[1]);
          }
        } catch (err) {
          console.log(err);
        }
      })();
  }, []);
  const progressPercent =
    taskDetails?.progress && taskDetails?.progress > 0
      ? `${taskDetails?.progress}%`
      : '0%';

  return (
    taskDetails && (
      <SafeAreaView className="px-3 bg-gray-100 flex-1">
        <View className="flex-row items-center justify-center mb-4">
          <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
            <GoBackIcon />
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
            <Text className="text-2xl font-bold">{taskDetails?.name}</Text>
          </View>
          {/* Progress Bar */}
          <View className=" flex-row">
            <View className="flex-1">
              <Text className="font-light text-[12px]">Progress</Text>
              <View className=" flex-row items-center gap-4">
                <View className="w-40 bg-[#E6E6E6] h-2 rounded-md ">
                  <View
                    style={{
                      width:
                        taskDetails?.progress && taskDetails?.progress > 0
                          ? `${taskDetails?.progress}%`
                          : 0,
                    }}
                    className={` h-full bg-[#18B797] rounded-md`}></View>
                </View>
                <Text className="font-bold">{taskDetails?.progress + '%'}</Text>
              </View>
            </View>
            <View className="items-center justify-center gap-1">
              <Text className="font-bold uppercase text-[#777676] text-[12px]">
                Due On
              </Text>
              <View className="bg-[#DF3745] rounded-md px-1 py-1">
                <Text className="font-bold text-white text-[13px]">
                  {formatDateTimeTimezone(taskDetails?.endDate, 'DD-MMM-YYYY')}
                </Text>
              </View>
            </View>
          </View>
          {/* Assigned to */}
          <View className="flex-row">
            <Text className="w-32 font-light">Assigned to</Text>
            <Text className="font-semi-bold">
              {taskDetails?.assignedTo?.name}
            </Text>
          </View>
          {/* Created At */}
          <View className="flex-row">
            <Text className="w-32 font-light">Created At</Text>
            <Text className="font-semi-bold">
              {formatDateTimeTimezone(taskDetails?.startDate, 'DD-MMM-YYYY')}
            </Text>
          </View>
          {/* Priority */}
          <View className="flex-row">
            <Text className="w-32 font-light">Priority</Text>
            <Tag content={taskDetails?.priority} />
          </View>
          {/* Description */}
          <View>
            <Text className="font-bold text-lg mb-2">Description</Text>
            <Text className="font-light text-[14px] text-[#646464]">
              {taskDetails?.description}
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
    )
  );
};

export default TaskDetails;
