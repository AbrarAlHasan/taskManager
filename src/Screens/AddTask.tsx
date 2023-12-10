import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import Tag from '../Components/Tag';
import SearchModal from '../Components/SearchModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDateTimeTimezone} from '../Utils/FormatDateTime';
import {addTasks, getMembers, getProjects} from '../axios/Tasks/tasks';
import {IProjectDetails, IProjectMembers} from './@Types';
import GoBackIcon from '../Assets/GoBack.svg';
import {getMemberId} from '../axios/ProjectMembers/ProjectMembers';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {setMemberDetails} from '../Store/Authentication';
import {showToastMessage} from '../Store/ToastSlice';

type NavigationProps = NativeStackNavigationProp<MainStackParamList>;

interface ITaskDetails {
  title: string;
  description: string;
  startDate: undefined | Date;
  endDate: undefined | Date;
  assignedTo: string;
  priority: string;
  project: string;
}
interface IDateDetails {
  field: string;
  open: boolean;
  minimumDate: undefined | Date;
  date: undefined | Date;
}

const AddTask = () => {
  const navigation = useNavigation<NavigationProps>();

  const {userDetails, memberDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );
  const dispatch = useDispatch();
  const [dateDetails, setDateDetails] = useState<IDateDetails>({
    field: '',
    open: false,
    minimumDate: undefined,
    date: undefined,
  });

  const initialValues = {
    title: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    assignedTo: '',
    priority: '',
    project: '',
  };
  const debounceDelay = 500;
  const [taskDetails, setTaskDetails] = useState<ITaskDetails>(initialValues);

  const [projects, setProjects] = useState<IProjectDetails[]>();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openMembersModal, setOpenMembersModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({_id: '', name: ''});
  const [selectedMembers, setSelectedMembers] = useState<IProjectMembers>();
  const [projectMembers, setProjectMembers] = useState<IProjectMembers[]>();
  const [memberSearch, setMemberSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const closeSearchModal = () => {
    setOpenSearchModal(false);
  };
  const closeMembersModal = () => {
    setOpenMembersModal(false);
  };

  const fetchProjects = async () => {
    if (userDetails) {
      const response = await getProjects(userDetails?._id, projectSearch);
      if (response[0] === 200) {
        setProjects(response[1]);
      }
    }
  };

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

  const fetchMembers = async () => {
    const response = await getMembers(selectedProject?._id, memberSearch);
    if (response[0] === 200) {
      setProjectMembers(response[1]);
    }
  };
  useEffect(() => {
    setSelectedMembers(undefined);
    let timer: NodeJS.Timeout | null = null;
    if (selectedProject?._id) {
      timer = setTimeout(() => {
        fetchMembers();
      }, debounceDelay);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [selectedProject?._id, memberSearch]);

  const handleDateChange = (date: Date) => {
    if (dateDetails.field === 'START_DATE') {
      setTaskDetails({...taskDetails, startDate: date});
    }
    if (dateDetails.field === 'END_DATE') {
      setTaskDetails({...taskDetails, endDate: date});
    }
    setDateDetails({...dateDetails, open: false});
  };

  const onMembersSearch = (text: string) => {
    setMemberSearch(text);
  };
  const onProjectSearch = (text: string) => {
    setProjectSearch(text);
  };

  const handlePost = async () => {
    try {
      const payload = {
        projectId: selectedProject?._id,
        name: taskDetails?.title,
        description: taskDetails?.description,
        startDate: taskDetails?.startDate,
        endDate: taskDetails?.endDate,
        assignedTo: selectedMembers?._id,
        priority: taskDetails?.priority,
        progress: 0,
        memberId: memberDetails?._id,
      };
      const response = await addTasks(payload);
      console.log(response);
      if (response[0] === 200) {
        navigation.goBack();
        dispatch(
          showToastMessage({
            text: 'Task Created Successfully',
            time: 1500,
            type: 'success',
          }),
        );
      } else if (response[0] === 400) {
        dispatch(
          showToastMessage({text: response[1], time: 1500, type: 'error'}),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
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
        open={openMembersModal}
        onClose={closeMembersModal}
        onChange={onMembersSearch}
        text={memberSearch}>
        {projectMembers?.map(data => {
          return (
            <Pressable
              onPress={() => {
                setSelectedMembers({
                  _id: data?._id,
                  name: data?.name,
                  role: data?.role,
                });
                closeMembersModal();
              }}
              key={data?._id}
              className="px-3 mt-1">
              <View className="flex-row my-2">
                <Text className="flex-1 font-bold">{data?.name}</Text>
                <Tag content={data?.role} color="random" />
              </View>
            </Pressable>
          );
        })}
      </SearchModal>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="w-full items-center justify-center flex-row relative mb-3">
            <Text className="text-lg font-bold">Add Task</Text>
            <Pressable onPress={handlePost} className="absolute right-0">
              <Tag content="Add Task" color="random" />
            </Pressable>
            <TouchableOpacity
              className="absolute left-0 top-0"
              onPress={() => {
                navigation.goBack();
              }}>
              <GoBackIcon />
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="gap-2 mb-3">
              <Text className="font-bold">Task Title</Text>
              <TextInput
                onChangeText={e => setTaskDetails({...taskDetails, title: e})}
                value={taskDetails?.title}
                placeholder="Task Title"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
              />
            </View>

            {/* Description */}
            <View className="gap-2 mb-3">
              <Text className="font-bold">Description</Text>
              <TextInput
                onChangeText={e =>
                  setTaskDetails({...taskDetails, description: e})
                }
                value={taskDetails?.description}
                multiline={true}
                placeholder="Task Title"
                className="w-full bg-[#e8e4e4] h-32 rounded-md px-3"
              />
            </View>
            {/* Date  */}
            <View className="flex-row gap-3">
              <View className="mb-3 flex-1">
                <Text className="font-bold mb-2">Start Date</Text>
                <Pressable
                  onPress={() => {
                    setDateDetails({
                      ...dateDetails,
                      open: true,
                      field: 'START_DATE',
                      date: taskDetails?.startDate,
                    });
                  }}>
                  <View className="w-full h-10  bg-[#e8e4e4] rounded-md px-3  justify-center">
                    <Text>
                      {taskDetails?.startDate
                        ? formatDateTimeTimezone(
                            taskDetails.startDate,
                            'DD-MM-YYYY',
                          )
                        : '--/--/--'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View className="mb-3 flex-1">
                <Text className="font-bold mb-2">End Date</Text>
                <Pressable
                  onPress={() => {
                    setDateDetails({
                      ...dateDetails,
                      open: true,
                      field: 'END_DATE',
                      date: taskDetails?.endDate,
                      minimumDate:
                        taskDetails?.startDate && taskDetails?.startDate,
                    });
                  }}>
                  <View className="w-full h-10  bg-[#e8e4e4] rounded-md px-3  justify-center">
                    <Text>
                      {taskDetails?.endDate
                        ? formatDateTimeTimezone(
                            taskDetails.endDate,
                            'DD-MM-YYYY',
                          )
                        : '--/--/--'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Project */}
            <View className="gap-2 mb-3">
              <Text className="font-bold">Project</Text>
              <TextInput
                onPressIn={() => setOpenSearchModal(true)}
                editable={false}
                onChangeText={e => setTaskDetails({...taskDetails, project: e})}
                value={selectedProject?.name}
                placeholder="Project"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
              />
              {/* <SearchModal value={taskDetails?.project} /> */}
            </View>
            {/* Assigned To */}
            <View className="gap-2 mb-3">
              <Text className="font-bold">Assigned To</Text>
              <TextInput
                editable={false}
                onPressIn={() =>
                  selectedProject?._id
                    ? setOpenMembersModal(true)
                    : console.log('Please select Project ')
                }
                onChangeText={e =>
                  setTaskDetails({...taskDetails, assignedTo: e})
                }
                value={selectedMembers?.name}
                placeholder="Assigned To"
                className="w-full bg-[#e8e4e4] h-10 rounded-md px-3"
              />
            </View>
            {/* Priority */}
            <View className="gap-2 mb-3">
              <Text className="font-bold">Priority</Text>
              <View className="flex-row ">
                <Pressable
                  onPress={() =>
                    setTaskDetails({...taskDetails, priority: 'low'})
                  }>
                  <Tag
                    content={'low'}
                    disabled={taskDetails?.priority === 'low' ? false : true}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    setTaskDetails({...taskDetails, priority: 'medium'})
                  }>
                  <Tag
                    content={'medium'}
                    disabled={taskDetails?.priority === 'medium' ? false : true}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    setTaskDetails({...taskDetails, priority: 'high'})
                  }>
                  <Tag
                    content={'high'}
                    disabled={taskDetails?.priority === 'high' ? false : true}
                  />
                </Pressable>
              </View>
            </View>
          </ScrollView>
          <DateTimePickerModal
            minimumDate={dateDetails?.minimumDate}
            date={dateDetails?.date ? dateDetails?.date : new Date()}
            isVisible={dateDetails?.open}
            onCancel={() => {
              setDateDetails({...dateDetails, open: false});
            }}
            onConfirm={date => handleDateChange(date)}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddTask;
