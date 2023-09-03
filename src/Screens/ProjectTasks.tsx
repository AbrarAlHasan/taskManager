import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackParamList} from '../Navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {ITaskDetails} from './@Types';
import {getTasks} from '../axios/Tasks/tasks';
import Tag from '../Components/Tag';
import TaskCard from '../Components/TaskCard';
import GoBackIcon from '../Assets/GoBack.svg';
import Loading from '../Components/Loading';

type ProjectDetailsScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProjectTasks'
>;

type ProjectDetailsProps = {
  navigation?: ProjectDetailsScreenNavigationProp;
  route?: {params: {projectId: string; projectName: string}};
};

const ProjectTasks = ({navigation, route}: ProjectDetailsProps) => {
  const [taskList, setTaskList] = useState<ITaskDetails[]>();
  const [selected, setSelected] = useState('pending');
  const projectId = route?.params.projectId;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectId &&
      (async () => {
        setIsLoading(true);
        try {
          const response = await getTasks(projectId, selected);
          if (response[0] === 200) {
            setIsLoading(false);
            setTaskList(response[1]);
          }
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      })();
  }, [selected]);
  return (
    <>
      <Loading show={isLoading} />
      {taskList && (
        <SafeAreaView
          style={{paddingHorizontal: 12}}
          className=" bg-white flex-1">
          <View className="w-full items-center justify-center flex-row relative mb-3">
            <Text className="text-lg font-bold">
              {route?.params?.projectName} Tasks
            </Text>
            <TouchableOpacity
              className="absolute left-0 top-0"
              onPress={() => {
                navigation && navigation.goBack();
              }}>
              <GoBackIcon />
            </TouchableOpacity>
          </View>
          <View className="flex-row mb-5 ">
            <TouchableOpacity
              className="mr-3"
              onPress={() => setSelected('pending')}>
              <View
                style={{
                  borderColor: selected === 'pending' ? '#2e08d4' : undefined,
                  borderBottomWidth: selected === 'pending' ? 1 : 0,
                }}
                className="px-4 py-2 ">
                <Text className="text-lg">Pending</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-3"
              onPress={() => setSelected('completed')}>
              <View
                style={{
                  borderColor: selected === 'completed' ? '#2e08d4' : undefined,
                  borderBottomWidth: selected === 'completed' ? 1 : 0,
                }}
                className="px-4 py-2  ">
                <Text className="text-lg">Completed</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-3"
              onPress={() => setSelected('breached')}>
              <View
                style={{
                  borderColor: selected === 'breached' ? '#2e08d4' : undefined,
                  borderBottomWidth: selected === 'breached' ? 1 : 0,
                }}
                className="px-4 py-2 ">
                <Text className="text-lg">Breached</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {taskList?.map(data => {
              return <TaskCard data={data} />;
            })}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProjectTasks;
