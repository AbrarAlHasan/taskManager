import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Loading from '../Components/Loading';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../Navigation/types';
import GoBackIcon from '../Assets/GoBack.svg';
import {getProjectMembers} from '../axios/ProjectMembers/ProjectMembers';
import Tag from '../Components/Tag';
import {IProjectMembersList} from './@Types';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {showToastMessage} from '../Store/ToastSlice';

type ProjectDetailsScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type ProjectDetailsProps = {
  navigation?: ProjectDetailsScreenNavigationProp;
  route?: {params: {projectId: string; projectName: string}};
};

const MembersList = ({navigation, route}: ProjectDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectMembers, setProjectMembers] = useState<any>(null);
  const {memberDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    route &&
      (async () => {
        try {
          const response = await getProjectMembers(
            route.params.projectId,
            memberDetails?._id,
          );
          if (response[0] === 200) {
            setIsLoading(false);
            setProjectMembers(response[1]);
          }
          if (response[0] == 400) {
            setIsLoading(false);
            dispatch(
              showToastMessage({
                text: response[1],
                time: 1500,
                type: 'warning',
              }),
            );
            navigation?.goBack();
          }
        } catch (err) {
          setIsLoading(false);
          console.log('Error Logged', err);
        }
      })();
  }, []);
  return (
    <>
      <Loading show={isLoading} />
      <SafeAreaView className="px-3 bg-gray-100 flex-1">
        <View className="w-full items-center justify-center flex-row relative mb-3">
          <View className="items-center">
            <Text className="text-lg font-bold">
              {route?.params.projectName}
            </Text>
            <Text className="text-xs font-bold">Members</Text>
          </View>

          <TouchableOpacity
            className="absolute left-0 top-3"
            onPress={() => navigation && navigation.goBack()}>
            <GoBackIcon />
          </TouchableOpacity>
        </View>
        <View className="mt-3 w-full h-10 items-center">
          <View className=" h-12 w-[90%] items-center">
            {projectMembers?.map((data: IProjectMembersList) => {
              return (
                <View className="flex-row items-center mt-4" key={data?._id}>
                  <View className="w-10 h-10 bg-gray-300 rounded-full mr-3"></View>
                  <Text className="flex-1">{data?.userId?.name}</Text>
                  <Tag content={data?.role} />
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MembersList;
