import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList, TProjectDetailsParams} from '../Navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../Components/TaskCard';
import {getTasks} from '../axios/Tasks/tasks';
import {IProjectDetailedDetails} from './@Types';
import TaskDetails from './TaskDetails';
import GoBackIcon from '../Assets/GoBack.svg';
import {getProjectDetails} from '../axios/Projects/Projects';
import Loading from '../Components/Loading';
import {useIsFocused} from '@react-navigation/native';
import {getAccessControlDetails} from '../axios/AccessControl/AccessControl';
import {checkForAccess} from '../Utils/CheckForAccess';
import {Config} from '../Utils/Config';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {setMemberDetails} from '../Store/Authentication';
import {showToastMessage} from '../Store/ToastSlice';

type ProjectDetailsScreenNavigationProp = StackNavigationProp<
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
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const {userDetails, memberDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );
  const dispatch = useDispatch();

  const navigateToAddMembers = async () => {
    const response = await getAccessControlDetails(memberDetails);
    if (response[0] === 200) {
      const checkAccess = checkForAccess(response[1], Config.memberModuleId);

      if (checkAccess.writeAccess) {
        projectDetails &&
          navigation?.navigate('AddMember', {
            projectId: projectDetails?._id,
            projectName: projectDetails?.name,
          });
      } else {
        dispatch(
          showToastMessage({
            text: 'Access Denied Please Contact Owner',
            time: 1500,
            type: 'error',
          }),
        );
      }
    }
  };

  const navigateToAddMember = async () => {
    const response = await getAccessControlDetails(memberDetails);
    if (response[0] === 200) {
      const checkAccess = checkForAccess(response[1], Config.memberModuleId);
      if (checkAccess.readAccess) {
        projectDetails &&
          navigation?.navigate('MembersList', {
            projectId: projectDetails?._id,
            projectName: projectDetails?.name,
          });
      } else {
        dispatch(
          showToastMessage({
            text: 'Access Denied Please Contact Owner',
            time: 1500,
            type: 'error',
          }),
        );
      }
    }
  };
  useEffect(() => {
    route &&
      (async () => {
        try {
          const response = await getProjectDetails(
            route.params.projectId,
            userDetails?._id,
          );
          if (response[0] === 200) {
            const {memberDetails, ...projectWithoutMemberDetails} = response[1];
            setIsLoading(false);
            setProjectDetails(projectWithoutMemberDetails);
            dispatch(setMemberDetails(memberDetails));
          }
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      })();
  }, [isFocused]);
  return (
    <>
      <Loading show={isLoading} />
      <SafeAreaView className="px-3 pt-4 bg-white flex-1">
        <View className="w-full items-center justify-center flex-row relative mb-3">
          <Text className="text-lg font-bold  text-black">
            {projectDetails?.name}
          </Text>
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
              <Text className="font-light mt-1 text-black">Total Tasks</Text>
            </View>
            <View className=" flex-1 items-center justify-center">
              <Text className="text-4xl font-bold text-green-600">
                {projectDetails?.completedTasks}
              </Text>
              <View className="h-[1px] w-[80%] bg-gray-400"></View>
              <Text className="font-light mt-1 text-black">Completed Tasks</Text>
            </View>
            <View className="flex-1 items-center justify-center">
              <Text className="text-4xl font-bold text-red-500">
                {projectDetails?.pendingTasks}
              </Text>
              <View className="h-[1px] w-[80%] bg-gray-400"></View>
              <Text className="font-light mt-1  text-black">Pending Tasks</Text>
            </View>
          </View>
          <View className="flex-row justify-between gap-2 mt-3">
            <Pressable
              onPress={() =>
                projectDetails &&
                navigation?.navigate('ProjectTasks', {
                  projectId: projectDetails?._id,
                  projectName: projectDetails?.name,
                })
              }
              className="bg-[#3786EB] items-center mt-5 rounded-lg py-1 flex-1">
              <Text className="text-md px-2 text-white font-bold uppercase">
                View All Tasks
              </Text>
            </Pressable>
            <Pressable
              onPress={() => projectDetails && navigation?.navigate('AddTaskN')}
              className="bg-[#3786EB] items-center mt-5 rounded-lg py-1 flex-1">
              <Text className="text-md px-2 text-white font-bold uppercase">
                Add Tasks
              </Text>
            </Pressable>
          </View>
          <View>
            <View className="items-center flex-row mt-10">
              <View className="flex-1 items-center justify-center">
                <Text className="text-4xl font-bold text-orange-400">
                  {projectDetails?.totalMembers}
                </Text>
                <View className="h-[1px] w-[80%] bg-gray-400"></View>
                <Text className="font-light mt-1  text-black">
                  Total Members
                </Text>
              </View>
              <View className=" flex-1 items-center justify-center">
                <Text className="text-4xl font-bold text-green-600">
                  {projectDetails?.completedTasks}
                </Text>
                <View className="h-[1px] w-[80%] bg-gray-400"></View>
                <Text className="font-light mt-1  text-black">
                  Pending Requests
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between gap-2 mt-3">
              <Pressable
                onPress={() => navigateToAddMember()}
                className="bg-[#3786EB] items-center mt-5 rounded-lg py-1 flex-1">
                <Text className="text-md px-2 text-white font-bold uppercase">
                  View All Members
                </Text>
              </Pressable>
              <Pressable
                onPress={() => projectDetails && navigateToAddMembers()}
                className="bg-[#3786EB] items-center mt-5 rounded-lg py-1 flex-1">
                <Text className="text-md px-2 text-white font-bold uppercase">
                  Add Members
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProjectDetails;
