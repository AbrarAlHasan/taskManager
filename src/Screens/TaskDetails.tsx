import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Tag from '../Components/Tag';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList, TTaskDetailsParams} from '../Navigation/types';
import {IProjectMembers, ITaskDetails, ITaskHistory} from './@Types';
import {editTask, getTaskDetails, getTaskHistory} from '../axios/Tasks/tasks';
import GoBackIcon from '../Assets/GoBack.svg';
import {formatDateTimeTimezone} from '../Utils/FormatDateTime';
import Loading from '../Components/Loading';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ConfirmationDialog from '../Components/ConfirmationDialog';
import EditIcon from '../Assets/EditIcon.svg';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {getMemberId} from '../axios/ProjectMembers/ProjectMembers';
import {showToastMessage} from '../Store/ToastSlice';

type TaskDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProjectDetails'
>;

type TaskDetailsProps = {
  navigation?: TaskDetailsScreenNavigationProp;
  route?: {params: TTaskDetailsParams};
};

interface IDateDetails {
  field: string;
  open: boolean;
  minimumDate: undefined | Date;
  date: undefined | Date;
}

interface IConfirmationDetails {
  type: string;
  show: boolean;
  oldDate?: Date;
  newDate?: Date;
  oldValue?: string | number;
  newValue?: string | number;
  placeholder: string;
  multiLine?: boolean;
  key: string;
}

const TaskDetails = ({navigation, route}: TaskDetailsProps) => {
  const [taskDetails, setTaskDetails] = useState<ITaskDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [taskHistory, setTaskHistory] = useState<ITaskHistory[]>();
  const [dateDetails, setDateDetails] = useState<IDateDetails>({
    field: '',
    open: false,
    minimumDate: undefined,
    date: undefined,
  });

  const [isRefresh, setIsRefresh] = useState(false);
  const [memberDetails, setMemberDetails] = useState<IProjectMembers>();

  const {userDetails} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );

  const dispatch = useDispatch();

  const [confirmationDetails, setConfirmationDetails] =
    useState<IConfirmationDetails>({
      type: '',
      oldDate: new Date(),
      newDate: new Date(),
      oldValue: '',
      newValue: '',
      show: false,
      placeholder: '',
      key: '',
    });

  useEffect(() => {
    route &&
      (async () => {
        try {
          const response = await getTaskDetails(route?.params?.taskId);
          if (response[0] === 200) {
            setTaskDetails(response[1]);
          }
          const taskHistoryResponse = await getTaskHistory(
            route?.params?.taskId,
          );
          if (taskHistoryResponse[0] === 200) {
            setTaskHistory(taskHistoryResponse[1]);
          }
          const memberDetailsResponse = await getMemberId(
            response[1]?.projectId,
            userDetails?._id,
          );
          if (memberDetailsResponse[0] === 200) {
            setMemberDetails(memberDetailsResponse[1]);
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      })();
  }, [isRefresh]);

  const progressPercent =
    taskDetails?.progress && taskDetails?.progress > 0
      ? `${taskDetails?.progress}%`
      : '0%';

  const handleDateChange = (date: Date) => {
    setDateDetails({...dateDetails, open: false});
    if (dateDetails.field === 'START_DATE') {
      setConfirmationDetails({
        ...confirmationDetails,
        type: 'DATE',
        placeholder: 'Start Date',
        oldDate: taskDetails?.startDate,
        newDate: date,
        show: true,
        key: 'startDate',
      });
    }
    if (dateDetails.field === 'END_DATE') {
      setConfirmationDetails({
        ...confirmationDetails,
        type: 'DATE',
        placeholder: 'Due Date',
        oldDate: taskDetails?.endDate,
        newDate: date,
        show: true,
        key: 'endDate',
      });
    }
  };

  const updateTaskDetails = async (editDetails: any) => {
    try {
      const payload = {
        ...editDetails,
        _id: route?.params?.taskId,
        memberId: memberDetails?._id,
        userId: userDetails?._id,
      };
      console.log(payload);
      setIsLoading(true);
      const response = await editTask(payload);
      setConfirmationDetails({
        ...confirmationDetails,
        show: false,
      });
      if (response[0] === 200) {
        dispatch(
          showToastMessage({text: 'Task Updated', time: 1500, type: 'success'}),
        );
      }
      setIsRefresh(!isRefresh);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Loading show={isLoading} />
      {taskDetails && (
        <SafeAreaView className="px-3 bg-white flex-1">
          <View className="flex-row items-center justify-center mb-4">
            <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
              <GoBackIcon />
            </TouchableOpacity>
            <Text className="flex-1 text-center font-bold text-lg">
              {'Task Details'}
            </Text>
            <Text className="font-bold text-lg">{'...'}</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            className="gap-3">
            <View>
              <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold mr-2">
                  {taskDetails?.name}
                </Text>
                <Pressable
                  onPress={() => {
                    setConfirmationDetails({
                      ...confirmationDetails,
                      type: 'TEXT',
                      oldValue: taskDetails?.name,
                      newValue: taskDetails?.name,
                      show: true,
                      placeholder: 'Name',
                      multiLine: false,
                      key: 'name',
                    });
                  }}>
                  <EditIcon width={18} height={18} />
                </Pressable>
              </View>
              <View className="w-full h-[1px] bg-gray-400 mb-4 mt-2"></View>
            </View>
            {/* Progress Bar */}
            <View className=" flex-row">
              <Pressable
                onPress={() => {
                  setConfirmationDetails({
                    ...confirmationDetails,
                    type: 'PROGRESS',
                    oldValue: taskDetails?.progress,
                    newValue: taskDetails?.progress,
                    show: true,
                    placeholder: 'Progress',
                    multiLine: false,
                    key: 'progress',
                  });
                }}
                className="flex-1">
                <Text className="font-light text-[12px]">Progress</Text>
                <View className=" flex-row items-center gap-4">
                  <View className="w-40 bg-[#E6E6E6] h-2 rounded-md ">
                    <View
                      style={{
                        width:
                          taskDetails?.progress && taskDetails?.progress > 0
                            ? `${taskDetails?.progress}%`
                            : 0,
                      }}
                      className={` h-full bg-[#18B797] rounded-md`}></View>
                  </View>
                  <Text className="font-bold">
                    {taskDetails?.progress + '%'}
                  </Text>
                </View>
              </Pressable>
              <View className="items-center justify-center gap-1">
                <Text className="font-bold uppercase text-[#777676] text-[12px]">
                  Start Date
                </Text>
                <Pressable
                  onPress={() => {
                    setDateDetails({
                      ...dateDetails,
                      date: new Date(taskDetails?.startDate),
                      open: true,
                      field: 'START_DATE',
                    });
                  }}
                  className="bg-green-500 rounded-md px-1 py-1">
                  <Text className="font-bold text-black text-[13px]">
                    {formatDateTimeTimezone(
                      taskDetails?.startDate,
                      'DD-MMM-YYYY',
                    )}
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* Assigned to */}
            <View className="flex-row">
              <View className="flex-1">
                <View className="flex-row mb-3">
                  <Text className="w-32 font-light">Assigned to</Text>
                  <Text className="font-semi-bold">
                    {taskDetails?.assignedTo?.name}
                  </Text>
                </View>
                {/* Created At */}
                <View className="flex-row">
                  <Text className="w-32 font-light">Created At</Text>
                  <Text className="font-semi-bold">
                    {formatDateTimeTimezone(
                      taskDetails?.createdAt,
                      'DD-MMM-YYYY',
                    )}
                  </Text>
                </View>
              </View>
              <View className="items-center justify-center gap-1">
                <Text className="font-bold uppercase text-[#777676] text-[12px]">
                  Due On
                </Text>
                <Pressable
                  onPress={() => {
                    setDateDetails({
                      ...dateDetails,
                      date: new Date(taskDetails?.endDate),
                      open: true,
                      field: 'END_DATE',
                    });
                  }}
                  className="bg-[#DF3745] rounded-md px-1 py-1">
                  <Text className="font-bold text-white text-[13px]">
                    {formatDateTimeTimezone(
                      taskDetails?.endDate,
                      'DD-MMM-YYYY',
                    )}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Priority */}
            <View className="flex-row">
              <Text className="w-32 font-light">Priority</Text>
              <Pressable
                onPress={() => {
                  setConfirmationDetails({
                    ...confirmationDetails,
                    type: 'PRIORITY',
                    oldValue: taskDetails?.priority,
                    newValue: taskDetails?.priority,
                    show: true,
                    placeholder: 'Priority',
                    multiLine: false,
                    key: 'priority',
                  });
                }}>
                <Tag content={taskDetails?.priority} />
              </Pressable>
            </View>
            {/* Description */}
            <View>
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-lg mr-2">Description</Text>
                <Pressable
                  onPress={() => {
                    setConfirmationDetails({
                      ...confirmationDetails,
                      type: 'TEXT',
                      oldValue: taskDetails?.description,
                      newValue: taskDetails?.description,
                      show: true,
                      placeholder: 'Description',
                      multiLine: true,
                      key: 'description',
                    });
                  }}>
                  <EditIcon width={18} height={18} />
                </Pressable>
              </View>

              <View className="w-full h-[1px] bg-gray-400 mb-4 mt-2"></View>
              <Text className="font-light text-[14px] text-[#646464]">
                {taskDetails?.description}
              </Text>
            </View>
            {/* Task History */}
            <View>
              <Text className="font-bold text-lg">Task History</Text>
              <View className="w-full h-[1px] bg-gray-400 mb-4 mt-2"></View>
              {taskHistory?.map((data, index) => {
                return (
                  <View key={data?._id} className="flex-row mb-5 relative">
                    <View className=" z-10 items-center justify-center rounded-full bg-blue-500 w-3 h-3 mt-[3.5px] mr-3 relative">
                      <View className="w-[50%] h-[50%] bg-white rounded-full" />
                    </View>

                    <View className="gap-1 w-[90%]">
                      <Text className="font-bold">{data?.createdBy?.name}</Text>
                      <Text className="font-light  text-[12px] text-gray-700">
                        {formatDateTimeTimezone(
                          data?.createdAt,
                          'DD-MMM-YYYY hh:MM A',
                        )}
                      </Text>
                      <Text className="font-light text-[14px] text-[#646464]">
                        {data?.description}
                      </Text>
                    </View>
                    {index !== taskHistory.length - 1 && (
                      <View className="absolute top-3 left-[5px] h-[130%] border-dotted  border-black border-[1px] z-0"></View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <DateTimePickerModal
            date={dateDetails?.date ? dateDetails?.date : new Date()}
            isVisible={dateDetails?.open}
            onCancel={() => {
              setDateDetails({...dateDetails, open: false});
            }}
            onConfirm={date => handleDateChange(date)}
          />
          {confirmationDetails?.show && (
            <ConfirmationDialog
              confirmationDetails={confirmationDetails}
              setConfirmationDetails={setConfirmationDetails}
              updateTaskDetails={updateTaskDetails}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default TaskDetails;
