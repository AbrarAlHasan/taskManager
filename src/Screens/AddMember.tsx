import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../Navigation/types';
import Loading from '../Components/Loading';
import GoBackIcon from '../Assets/GoBack.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  addMember,
  getVerifyMember,
} from '../axios/ProjectMembers/ProjectMembers';
import {ToastMessage} from '../Utils/ToastNotification';
import {IProjectDetails, IUserDetails} from './@Types';
import SearchModal from '../Components/SearchModal';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {getProjects} from '../axios/Tasks/tasks';
import Tag from '../Components/Tag';
import {resetPassword} from '../axios/Authentication/Authentication';

type MemberScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type ProjectDetailsProps = {
  navigation?: MemberScreenNavigationProp;
  route?: {params: {projectId?: string; projectName?: string}};
};

const rolesData = [
  {_id: '1', name: 'owner'},
  {_id: '2', name: 'manager'},
  {_id: '3', name: 'employee'},
];

const AddMember = ({navigation, route}: ProjectDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projects, setProjects] = useState<IProjectDetails[]>();
  const [selectedProject, setSelectedProject] = useState({_id: '', name: ''});
  const [selectedRole, setSelectedRole] = useState({_id: '', name: ''});

  const [memberEmail, setMemberEmail] = useState('');
  const [memberDetails, setMemberDetails] = useState<IUserDetails | null>(null);
  const {userDetails} = useContext(AuthContext);
  const debounceDelay = 500;
  const [openRoleModal, setOpenRoleModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (userDetails) {
      timer = setTimeout(() => {
        fetchProjects();
      }, debounceDelay);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [projectSearch]);

  const resetMemberInfo = () => {
    setMemberEmail('');
    setMemberDetails(null);
    setSelectedProject({_id: '', name: ''});
    setSelectedRole({_id: '', name: ''});
  };

  const fetchProjects = async () => {
    const response = await getProjects(userDetails?._id, projectSearch);
    if (response[0] === 200) {
      setProjects(response[1]);
    }
  };

  const verifyMember = async () => {
    try {
      setIsLoading(true);
      const response = await getVerifyMember(memberEmail);
      setIsLoading(false);
      if (response[0] === 200 && response[1]) {
        setMemberDetails(response[1]);
      } else {
        ToastMessage('User Not Found');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const closeSearchModal = () => {
    setOpenSearchModal(false);
  };

  const onProjectSearch = (text: string) => {
    setProjectSearch(text);
  };

  const closeRoleSearchModal = () => {
    setOpenRoleModal(false);
  };
  const handleAddMember = async () => {
    if (memberDetails) {
      try {
        const response = await addMember(
          selectedProject?._id,
          memberDetails?._id,
          selectedRole?.name,
          userDetails?._id,
        );
        if (response[0] === 200) {
          navigation?.goBack();
          ToastMessage(response[1]);
        }
        if (response[0] === 400) {
          ToastMessage(response[1]);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Loading show={isLoading} />
      <SafeAreaView className="px-3 bg-gray-100 flex-1">
        <View className="flex-1 px-3">
          <View className="w-full items-center justify-center flex-row relative mb-3">
            <Text className="text-lg font-bold">Add Member</Text>
            <Pressable onPress={handleAddMember} className="absolute right-0">
              <Tag
                disabled={!selectedProject.name || !selectedRole.name}
                content="Add Member"
                color="random"
              />
            </Pressable>
            <TouchableOpacity
              className="absolute left-0 top-0"
              onPress={() => {
                navigation && navigation.goBack();
              }}>
              <GoBackIcon />
            </TouchableOpacity>
          </View>
          {!memberDetails && (
            <View className="my-3 relative">
              <Text className="font-bold mb-2">Member Email</Text>
              <TextInput
                onChangeText={e => setMemberEmail(e)}
                value={memberEmail}
                autoCapitalize="none"
                placeholder="Member Email"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3 "
              />
              {memberEmail && !memberDetails && (
                <Pressable
                  onPress={verifyMember}
                  className="absolute right-3 top-9">
                  <Text className=" text-blue-500 font-semibold">Verify</Text>
                </Pressable>
              )}
            </View>
          )}
          {memberDetails && (
            <>
              <View className="gap-2 mt-3">
                <View className="flex-row items-center">
                  <Text className="font-bold text-md">Name : </Text>
                  <Text className="font-light text-md">
                    {memberDetails?.name}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-bold text-md">Email : </Text>
                  <Text className="font-light text-md">
                    {memberDetails?.email}
                  </Text>
                </View>
              </View>
              <View className="flex-row-reverse mt-4">
                <Pressable
                  onPress={() => resetMemberInfo()}
                  className="bg-red-300 px-3 py-2 rounded-lg">
                  <Text className="font-semibold">Change User</Text>
                </Pressable>
              </View>
              <View className="mt-5 mb-3">
                <Text className="font-bold mb-2">Project</Text>
                <TextInput
                  onPressIn={() => setOpenSearchModal(true)}
                  editable={false}
                  value={selectedProject?.name}
                  placeholder="Project"
                  className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
                />
                {/* <SearchModal value={taskDetails?.project} /> */}
              </View>

              <View className="mt-5 mb-3">
                <Text className="font-bold mb-2">Role</Text>
                <TextInput
                  onPressIn={() => setOpenRoleModal(true)}
                  editable={false}
                  value={selectedRole?.name}
                  placeholder="Role"
                  className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
                />
                {/* <SearchModal value={taskDetails?.project} /> */}
              </View>
              <SearchModal
                open={openSearchModal}
                onClose={closeSearchModal}
                onChange={onProjectSearch}
                text={projectSearch}>
                {projects?.map(data => {
                  return (
                    <Pressable
                      onPress={() => {
                        setSelectedProject({_id: data?._id, name: data?.name});
                        closeSearchModal();
                      }}
                      key={data?._id}
                      className="px-3 mt-1 my-3">
                      <Text className="font-bold">{data?.name}</Text>
                    </Pressable>
                  );
                })}
              </SearchModal>
              <SearchModal
                enableSearch={false}
                open={openRoleModal}
                onClose={closeRoleSearchModal}>
                {rolesData?.map(data => {
                  return (
                    <Pressable
                      onPress={() => {
                        setSelectedRole({_id: data?._id, name: data?.name});
                        closeRoleSearchModal();
                      }}
                      key={data?._id}
                      className="px-3 mt-1 my-3">
                      <Text className="font-bold">{data?.name}</Text>
                    </Pressable>
                  );
                })}
              </SearchModal>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddMember;
