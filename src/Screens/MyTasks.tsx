import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {useNavigation} from '@react-navigation/native';
import {getMyTasks, getTasks} from '../axios/Tasks/tasks';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {ITaskDetails} from './@Types';
import Tag from '../Components/Tag';
import {MainStackParamList, TProjectDetailsParams} from '../Navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ProjectDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProjectTasks'
>;

type ProjectDetailsProps = {
  navigation: ProjectDetailsScreenNavigationProp;
  route: {params: TProjectDetailsParams};
};

const MyTasks = ({navigation, route}: ProjectDetailsProps) => {
  const {userDetails} = useContext(AuthContext);
  const [taskList, setTaskList] = useState<ITaskDetails[]>();
  const [selected, setSelected] = useState('pending');
  useEffect(() => {
    userDetails &&
      (async () => {
        const response = await getMyTasks(userDetails?._id, selected);
        if (response[0] === 200) {
          setTaskList(response[1]);
        }
      })();
  }, [selected]);
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="w-full items-center justify-center flex-row relative mb-3">
        <Text className="text-lg font-bold">My Tasks</Text>
      </View>
      <View className="flex-row mb-5">
        <TouchableOpacity onPress={() => setSelected('pending')}>
          <Tag
            content={'pending'}
            color={selected === 'pending' ? '#2e08d4' : undefined}
            disabled={selected === 'pending' ? false : true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected('completed')}>
          <Tag
            content={'completed'}
            color={selected === 'completed' ? '#2e08d4' : undefined}
            disabled={selected === 'completed' ? false : true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected('breached')}>
          <Tag
            content={'breached'}
            color={selected === 'breached' ? '#2e08d4' : undefined}
            disabled={selected === 'breached' ? false : true}
          />
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

export default MyTasks;
