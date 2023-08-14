import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList, TProjectDetailsParams} from '../Navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {getTasks} from '../axios/Tasks/tasks';
import {IProjectDetailedDetails} from './@Types';
import TaskDetails from './TaskDetails';
import GoBackIcon from '../Assets/GoBack.svg';
import {getProjectDetails} from '../axios/Projects/Projects';

type ProjectDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type ProjectDetailsProps = {
  navigation?: ProjectDetailsScreenNavigationProp;
  route?: {params: {projectId: string}};
};

const ProjectDetails = ({navigation, route}: ProjectDetailsProps) => {
  const [projectDetails, setProjectDetails] =
    useState<IProjectDetailedDetails>();
  useEffect(() => {
    route &&
      (async () => {
        try {
          const response = await getProjectDetails(route.params.projectId);
          console.log(response);
          if (response[0] === 200) {
            setProjectDetails(response[1]);
          }
        } catch (err) {
          console.log(err);
        }
      })();
  }, []);
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="w-full items-center justify-center flex-row relative mb-3">
        <Text className="text-lg font-bold">{projectDetails?.name}</Text>
        <TouchableOpacity
          className="absolute left-0 top-0"
          onPress={() => navigation && navigation.goBack()}>
          <GoBackIcon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {taskList?.map(data => {
          return <TaskCard key={data?._id} data={data} />;
        })} */}
        <View className="items-center flex-row mt-10">
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl font-bold text-orange-400">
              {projectDetails?.totalTasks}
            </Text>
            <View className="h-[1px] w-[80%] bg-gray-400"></View>
            <Text className="font-light mt-1">Total Tasks</Text>
          </View>
          <View className=" flex-1 items-center justify-center">
            <Text className="text-4xl font-bold text-green-600">
              {projectDetails?.completedTasks}
            </Text>
            <View className="h-[1px] w-[80%] bg-gray-400"></View>
            <Text className="font-light mt-1">Completed Tasks</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl font-bold text-red-500">
              {projectDetails?.pendingTasks}
            </Text>
            <View className="h-[1px] w-[80%] bg-gray-400"></View>
            <Text className="font-light mt-1">Pending Tasks</Text>
          </View>
        </View>
        <View className="bg-[#3786EB] items-center mt-5 rounded-lg py-1">
          <Text className="text-2xl text-white font-bold uppercase">
            View All Tasks
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetails;
