import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import Card from '../Components/Card';
import {getProjects} from '../axios/Projects/Projects';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {IProjectListType} from './@Types';
import Loading from '../Components/Loading';
type NavigationProps = NativeStackNavigationProp<MainStackParamList>;
const Dashboard = () => {
  const navigation = useNavigation<NavigationProps>();
  const isFocused = useIsFocused();

  const {userDetails} = useContext(AuthContext);

  const [projectList, setProjectList] = useState<IProjectListType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userDetails &&
      (async () => {
        try {
          const response = await getProjects(userDetails?._id);
          console.log(response);
          if (response[0] === 200) {
            setIsLoading(false);
            setProjectList(response[1]);
          }
        } catch (err) {
          console.log(err);
        }
      })();
  }, [isFocused]);

  return (
    <>
      <Loading show={isLoading} />
      <SafeAreaView className="px-3 bg-gray-100 flex-1">
        <View className="w-full items-center justify-center flex-row relative mb-3">
          <Text className="text-lg font-bold">Projects</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('AddProject')}
          className="w-16 h-16 rounded-full bg-red-400 absolute right-5 bottom-10 items-center justify-center z-10">
          <Text className="text-4xl text-white font-bold">+</Text>
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          {projectList?.map((data, idx) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProjectDetails', {
                  projectId: data?.projectDetails?._id,
                  projectName: data?.projectDetails?.name,
                })
              }
              key={idx}>
              <Card data={data} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
