import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import Card from '../Components/Card';
import {getProjects} from '../axios/Projects/Projects';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {IProjectListType} from './@Types';
type NavigationProps = NativeStackNavigationProp<MainStackParamList>;
const Dashboard = () => {
  const navigation = useNavigation<NavigationProps>();

  const {userDetails} = useContext(AuthContext);

  const [projectList, setProjectList] = useState<IProjectListType[]>();

  useEffect(() => {
    userDetails &&
      (async () => {
        const response = await getProjects(userDetails?._id);
        if (response[0] === 200) {
          setProjectList(response[1]);
        }
      })();
  }, [userDetails]);

  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
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
  );
};

export default Dashboard;
