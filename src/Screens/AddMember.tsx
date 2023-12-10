import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  Switch,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../Navigation/types';
import Loading from '../Components/Loading';
import GoBackIcon from '../Assets/GoBack.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  addMember,
  getMemberId,
  getVerifyMember,
} from '../axios/ProjectMembers/ProjectMembers';
import {IProjectDetails, IUserDetails} from './@Types';
import SearchModal from '../Components/SearchModal';
import {getProjects} from '../axios/Tasks/tasks';
import Tag from '../Components/Tag';
import {resetPassword} from '../axios/Authentication/Authentication';
import {Config} from '../Utils/Config';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {setMemberDetails} from '../Store/Authentication';
import {showToastMessage} from '../Store/ToastSlice';

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
  const [newMemberDetails, setNewMemberDetails] = useState<IUserDetails | null>(
    null,
  );

  const {userDetails, memberDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );

  const dispatch = useDispatch();
  const debounceDelay = 500;
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [accessDetails, setAccessDetails] = useState<any>();

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

  const getMemberDetails = async () => {
    try {
      console.log('ENteered');
      const response = await getMemberId(
        selectedProject?._id,
        userDetails?._id,
      );
      if (response[0] === 200) {
        dispatch(setMemberDetails(response[1]));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    selectedProject?._id && getMemberDetails();
  }, [selectedProject]);

  const resetMemberInfo = () => {
    setMemberEmail('');
    setNewMemberDetails(null);
    setSelectedProject({_id: '', name: ''});
    setSelectedRole({_id: '', name: ''});
  };

  const fetchProjects = async () => {
    const response = await getProjects(userDetails?._id, projectSearch);
    if (response[0] === 200) {
      setProjects(response[1]);
    }
  };

  const onChangeAccess = (
    idx: number,
    key: 'readAccess' | 'writeAccess' | 'updateAccess' | 'deleteAccess',
  ) => {
    setAccessDetails(
      (
        prevData: Array<{
          name: String;
          _id: String;
          readAccess: 0 | 1;
          writeAccess: 0 | 1;
          updateAccess: 0 | 1;
          deleteAccess: 0 | 1;
        }>,
      ) => {
        const changeRequest = prevData[idx];

        const replaceValue = changeRequest[key] === 0 ? 1 : 0;
        const newData = {...changeRequest, [key]: replaceValue};
        return [...prevData.slice(0, idx), newData, ...prevData.slice(idx + 1)];
      },
    );
  };

  const verifyMember = async () => {
    try {
      setIsLoading(true);
      const response = await getVerifyMember(memberEmail);
      setIsLoading(false);
      if (response[0] === 200 && response[1]) {
        setNewMemberDetails(response[1]);
        setAccessDetails((prevState: any) => {
          const newAccessDetails = Config.modules?.map(data => {
            return {
              name: data?.name,
              _id: data?._id,
              readAccess: 0,
              writeAccess: 0,
              updateAccess: 0,
              deleteAccess: 0,
            };
          });
          return newAccessDetails;
        });
      } else {
        dispatch(
          showToastMessage({text: 'User Not Found', time: 1500, type: 'error'}),
        );
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
    if (newMemberDetails) {
      setIsLoading(true);

      try {
        const response = await addMember(
          selectedProject?._id,
          newMemberDetails?._id,
          selectedRole?.name,
          userDetails?._id,
          memberDetails?._id,
          accessDetails,
        );
        console.log(response);
        setIsLoading(false);
        if (response[0] === 200) {
          navigation?.goBack();
          dispatch(showToastMessage({text: response[1], time: 1500,type:'success'}));
        }
        if (response[0] === 400) {
          dispatch(showToastMessage({text: response[1], time: 1500,type:'error'}));
        }
      } catch (err: any) {
        setIsLoading(false);
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
          {!newMemberDetails && (
            <View className="my-3 relative">
              <Text className="font-bold mb-2">Member Email</Text>
              <TextInput
                onChangeText={e => setMemberEmail(e)}
                value={memberEmail}
                autoCapitalize="none"
                placeholder="Member Email"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3 "
              />
              {memberEmail && !newMemberDetails && (
                <Pressable
                  onPress={verifyMember}
                  className="absolute right-3 top-9">
                  <Text className=" text-blue-500 font-semibold">Verify</Text>
                </Pressable>
              )}
            </View>
          )}
          {newMemberDetails && (
            <>
              <View className="gap-2 mt-3">
                <View className="flex-row items-center">
                  <Text className="font-bold text-md">Name : </Text>
                  <Text className="font-light text-md">
                    {newMemberDetails?.name}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-bold text-md">Email : </Text>
                  <Text className="font-light text-md">
                    {newMemberDetails?.email}
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
              <View>
                {accessDetails?.map((data: any, idx: number) => {
                  return (
                    <View key={data?._id} className="mt-6">
                      <View className="items-center">
                        <Text className="text-lg font-bold">
                          {data?.name + ' ' + 'Access'}
                        </Text>
                      </View>
                      <View className="flex-row justify-around pt-5">
                        <View className="items-center gap-2">
                          <Text>Read</Text>
                          <Switch
                            value={data?.readAccess === 1 ? true : false}
                            onChange={() => {
                              onChangeAccess(idx, 'readAccess');
                            }}
                          />
                        </View>
                        <View className="items-center gap-2">
                          <Text>Write</Text>
                          <Switch
                            value={data?.writeAccess === 1 ? true : false}
                            onChange={() => {
                              onChangeAccess(idx, 'writeAccess');
                            }}
                          />
                        </View>
                        <View className="items-center gap-2">
                          <Text>Update</Text>
                          <Switch
                            value={data?.updateAccess === 1 ? true : false}
                            onChange={() => {
                              onChangeAccess(idx, 'updateAccess');
                            }}
                          />
                        </View>
                        <View className="items-center gap-2">
                          <Text>Delete</Text>
                          <Switch
                            value={data?.deleteAccess === 1 ? true : false}
                            onChange={() => {
                              onChangeAccess(idx, 'deleteAccess');
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddMember;
