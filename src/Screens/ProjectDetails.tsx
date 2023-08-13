import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList, TProjectDetailsParams} from '../Navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {getTasks} from '../axios/Tasks/tasks';
import {ITaskDetails} from './@Types';
import TaskDetails from './TaskDetails';
import GoBackIcon from '../Assets/GoBack.svg';

type ProjectDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type ProjectDetailsProps = {
  navigation: ProjectDetailsScreenNavigationProp;
  route: {params: TProjectDetailsParams};
};

const ProjectDetails = ({navigation, route}: ProjectDetailsProps) => {
  const [taskList, setTaskList] = useState<ITaskDetails[]>();
  useEffect(() => {
    (async () => {
      const response = await getTasks(route.params.projectId);
      if (response[0] === 200) {
        setTaskList(response[1]);
      }
    })();
  }, []);
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="w-full items-center justify-center flex-row relative mb-3">
        <Text className="text-lg font-bold">{route?.params?.projectName}</Text>
        <TouchableOpacity
          className="absolute left-0 top-0"
          onPress={() => navigation.goBack()}>
          <GoBackIcon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {taskList?.map(data => {
          return <TaskCard key={data?._id} data={data} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetails;
