import React, {useContext, useState} from 'react';
import {
  Keyboard,
  Pressable,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';

import Tag from '../Components/Tag';
import GoBackIcon from '../Assets/GoBack.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {addProject} from '../axios/Projects/Projects';
import {ToastMessage} from '../Utils/ToastNotification';
import Loading from '../Components/Loading';

type NavigationProps = NativeStackNavigationProp<MainStackParamList>;

const AddProject = () => {
  const navigation = useNavigation<NavigationProps>();

  const {userDetails} = useContext(AuthContext);

  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: projectDetails?.name,
        description: projectDetails?.description,
        createdBy: userDetails?._id,
      };
      const response = await addProject(payload);
      setIsLoading(false);
      if (response[0] === 200) {
        navigation.goBack();
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <Loading show={isLoading} />

      <SafeAreaView className=" bg-gray-100 flex-1">
        <View className="px-4 flex-1">
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View className="w-full items-center justify-center flex-row relative mb-3">
                <Text className="text-lg font-bold">Add Project</Text>
                <Pressable
                  className="absolute right-0"
                  onPress={handleCreateProject}>
                  <Tag content="Add Project" color="random" />
                </Pressable>
                <TouchableOpacity
                  className="absolute left-0 top-0"
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <GoBackIcon />
                </TouchableOpacity>
              </View>
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}>
                <View className="gap-2 mb-3">
                  <Text className="font-bold">Project Title</Text>
                  <TextInput
                    onChangeText={e =>
                      setProjectDetails({...projectDetails, name: e})
                    }
                    value={projectDetails?.name}
                    placeholder="Project Title"
                    className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
                  />
                </View>
                <View className="gap-2 mb-3">
                  <Text className="font-bold">Description</Text>
                  <TextInput
                    onChangeText={e =>
                      setProjectDetails({...projectDetails, description: e})
                    }
                    value={projectDetails?.description}
                    multiline={true}
                    placeholder="Task Title"
                    className="w-full bg-[#e8e4e4] h-32 rounded-md px-3"
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddProject;
