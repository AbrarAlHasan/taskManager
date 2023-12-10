import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {useNavigation} from '@react-navigation/native';
import {getMyTasks} from '../axios/Tasks/tasks';
import {ITaskDetails} from './@Types';
import Tag from '../Components/Tag';
import Loading from '../Components/Loading';
import {useSelector} from 'react-redux';
import {AuthState} from '../Store';

const TaskList = () => {
  const {userDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );
  const [taskList, setTaskList] = useState<ITaskDetails[]>();
  const [selected, setSelected] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userDetails &&
      (async () => {
        try {
          setIsLoading(true);
          const response = await getMyTasks(userDetails?._id, selected);
          if (response[0] === 200) {
            setIsLoading(false);
            setTaskList(response[1]);
          }
        } catch (err) {
          console.log(err);
        }
      })();
  }, [selected]);
  return (
    <>
      <Loading show={isLoading} />
      <SafeAreaView className="px-3 bg-gray-100 flex-1">
        <View className="w-full items-center justify-center flex-row relative mb-3">
          <Text className="text-lg font-bold">My Tasks</Text>
        </View>
        <View className="flex-row mb-5 ">
          <TouchableOpacity
            className="mr-3"
            onPress={() => setSelected('pending')}>
            {/* <Tag
            content={'pending'}
            color={selected === 'pending' ? '#2e08d4' : undefined}
            disabled={selected === 'pending' ? false : true}
          /> */}
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
            {/* <Tag
            content={'completed'}
            color={selected === 'completed' ? '#2e08d4' : undefined}
            disabled={selected === 'completed' ? false : true}
          /> */}
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
            {/* <Tag
            content={'breached'}
            color={selected === 'breached' ? '#2e08d4' : undefined}
            disabled={selected === 'breached' ? false : true}
          /> */}
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
            return <TaskCard key={data?._id} data={data} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TaskList;
