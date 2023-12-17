import {View, Text, Pressable, Dimensions, DimensionValue} from 'react-native';
import React, {useState} from 'react';
import {formatDateTimeTimezone} from '../Utils/FormatDateTime';
import DownArrowIcon from '../Assets/DownArrowIcon.svg';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Tag from './Tag';

const ConfirmationDialog = ({
  confirmationDetails,
  setConfirmationDetails,
  updateTaskDetails,
}: {
  confirmationDetails: {
    type: string;
    show: boolean;
    oldDate?: Date;
    newDate?: Date;
    oldValue?: string | number;
    newValue?: string | number;
    placeholder: string;
    multiLine?: boolean;
    key: string;
  };
  setConfirmationDetails: any;
  updateTaskDetails: (payload: any) => void;
}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [showConfirmationForText, setShowConfirmationForText] = useState(false);

  const renderDateDesign = () => {
    return (
      <>
        <Text className="font-bold text-lg">{`Do you want to Edit the ${confirmationDetails.placeholder}`}</Text>
        <View className="w-[100%] h-[1px] bg-gray-400 mb-4 mt-2"></View>
        <ScrollView className="w-[90%] pb-4">
          <View className="items-center ">
            {confirmationDetails?.oldDate && (
              <View>
                {confirmationDetails?.type === 'DATE' &&
                  confirmationDetails?.oldDate && (
                    <Text className="font-bold text-red-500 mb-1 w-[90%]">
                      {formatDateTimeTimezone(confirmationDetails?.oldDate)}
                    </Text>
                  )}
                <View className="items-center">
                  <DownArrowIcon height={30} />
                </View>
                {confirmationDetails?.type === 'DATE' &&
                  confirmationDetails?.newDate && (
                    <Text className="font-bold text-green-500 w-[90%]">
                      {formatDateTimeTimezone(confirmationDetails?.newDate)}
                    </Text>
                  )}
              </View>
            )}
          </View>
        </ScrollView>

        <View className="flex-row mt-4 justify-between">
          <Pressable
            onPress={() => {
              setConfirmationDetails({
                ...confirmationDetails,
                show: false,
              });
            }}
            className="bg-red-500 px-3 py-2 mr-4 rounded-md">
            <Text className="font-bold text-white">No</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const payload: any = {};
              payload[confirmationDetails?.key] = confirmationDetails?.newDate;
              updateTaskDetails(payload);
            }}
            className="bg-green-500 px-3 py-2 ml-4 rounded-md">
            <Text className="font-bold">Yes</Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderTextDesign = () => {
    return (
      <>
        {typeof confirmationDetails.newValue === 'string' && (
          <TextInput
            onChangeText={txt =>
              setConfirmationDetails({...confirmationDetails, newValue: txt})
            }
            value={confirmationDetails?.newValue}
            multiline={true}
            placeholder="Task Title"
            className="w-[85%] bg-[#e8e4e4] h-32 rounded-md px-3"
          />
        )}

        <View className="flex-row mt-4 justify-between">
          <Pressable
            onPress={() => {
              setConfirmationDetails({
                ...confirmationDetails,
                show: false,
              });
            }}
            className="bg-red-500 px-3 py-2 mr-4 rounded-md">
            <Text className="font-bold text-white">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowConfirmationForText(true);
            }}
            className="bg-orange-500 px-3 py-2 ml-4 rounded-md">
            <Text className="font-bold text-white">Update</Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderTextConfirmation = () => {
    return (
      <>
        <Text className="font-bold text-lg">{`Do you want to Edit the ${confirmationDetails.placeholder}`}</Text>
        <View className="w-[100%] h-[1px] bg-gray-400 mb-4 mt-2"></View>
        {confirmationDetails?.type === 'TEXT' && (
          <ScrollView className="w-[90%] pb-4">
            <View className="items-center">
              {confirmationDetails?.oldValue && (
                <Text className="font-bold text-red-500 mb-1 w-[90%]">
                  {confirmationDetails?.oldValue}
                </Text>
              )}
              <DownArrowIcon height={30} />
              {confirmationDetails?.newValue && (
                <Text className="font-bold text-green-500 w-[90%]">
                  {confirmationDetails?.newValue}
                </Text>
              )}
            </View>
          </ScrollView>
        )}
        {confirmationDetails?.type === 'PROGRESS' && (
          <View className="w-[90%] items-center">
            <Text className="font-bold text-red-500">
              {confirmationDetails?.oldValue + '%'}
            </Text>
            <DownArrowIcon height={30} />
            <Text className="font-bold text-green-500">
              {confirmationDetails?.newValue + '%'}
            </Text>
          </View>
        )}

        {confirmationDetails?.type === 'PRIORITY' && (
          <View className="w-[90%] items-center">
            {confirmationDetails?.oldValue &&
              typeof confirmationDetails?.oldValue === 'string' && (
                <Tag content={confirmationDetails?.oldValue} />
              )}
            <DownArrowIcon height={30} />
            {confirmationDetails?.newValue &&
              typeof confirmationDetails?.newValue === 'string' && (
                <Tag content={confirmationDetails?.newValue} />
              )}
          </View>
        )}

        <View className="flex-row mt-4 justify-between">
          <Pressable
            onPress={() => {
              setConfirmationDetails({
                ...confirmationDetails,
                show: false,
              });
            }}
            className="bg-red-500 px-3 py-2 mr-4 rounded-md">
            <Text className="font-bold text-white">No</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              updateTaskDetails({
                [confirmationDetails?.key]: confirmationDetails?.newValue,
              });
            }}
            className="bg-green-500 px-3 py-2 ml-4 rounded-md">
            <Text className="font-bold">Yes</Text>
          </Pressable>
        </View>
      </>
    );
  };

  const renderPercentageNew = () => {
    const percentages = [25, 50, 75, 100];
    const checkPercentage = (value: number): DimensionValue => {
      return `${(95 * value) / 100}%`;
    };
    return (
      <View className="w-[100%] items-center">
        <View className="w-[85%] bg-green-500 h-2 rounded-md mt-5 flex-row relative">
          {percentages?.map((data, idx) => {
            return (
              <View
              key={idx}
                className={`flex-1 h-2 ${
                  typeof confirmationDetails?.newValue === 'number' &&
                  confirmationDetails?.newValue >= data
                    ? 'bg-green-500'
                    : 'bg-red-500'
                } relative rounded-lg`}>
                {idx === 0 && (
                  <Pressable
                    onPress={() => {
                      setConfirmationDetails({
                        ...confirmationDetails,
                        newValue: 0,
                      });
                    }}>
                    <Text
                      style={{top: -32, left: -5}}
                      className="absolute font-bold h-10">
                      {0 + '%'}
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => {
                    setConfirmationDetails({
                      ...confirmationDetails,
                      newValue: data,
                    });
                  }}>
                  <Text
                    style={{top: -32, right: -20}}
                    className="absolute font-bold h-10">
                    {data + '%'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
          {typeof confirmationDetails?.newValue === 'number' && (
            <View
              style={{
                top: -6,
                left: confirmationDetails?.newValue
                  ? checkPercentage(confirmationDetails?.newValue)
                  : -8,
              }}
              className="absolute h-5 w-5 bg-green-500 rounded-full"></View>
          )}
        </View>
        <View className="flex-row mt-4 justify-between">
          <Pressable
            onPress={() => {
              setConfirmationDetails({
                ...confirmationDetails,
                show: false,
              });
            }}
            className="bg-red-500 px-3 py-2 mr-4 rounded-md">
            <Text className="font-bold text-white">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowConfirmationForText(true);
            }}
            className="bg-orange-500 px-3 py-2 ml-4 rounded-md">
            <Text className="font-bold text-white">Update</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderPriority = () => {
    return (
      <View className="w-[100%] items-center">
        <View className="w-[90%]">
          <View className="flex-row ">
            <Pressable
              onPress={() => {
                setConfirmationDetails({
                  ...confirmationDetails,
                  newValue: 'low',
                });
              }}>
              <Tag
                content={'low'}
                disabled={
                  confirmationDetails?.newValue === 'low' ? false : true
                }
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setConfirmationDetails({
                  ...confirmationDetails,
                  newValue: 'medium',
                });
              }}>
              <Tag
                content={'medium'}
                disabled={
                  confirmationDetails?.newValue === 'medium' ? false : true
                }
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setConfirmationDetails({
                  ...confirmationDetails,
                  newValue: 'high',
                });
              }}>
              <Tag
                content={'high'}
                disabled={
                  confirmationDetails?.newValue === 'high' ? false : true
                }
              />
            </Pressable>
          </View>
        </View>
        <View className="flex-row mt-4 justify-between">
          <Pressable
            onPress={() => {
              setConfirmationDetails({
                ...confirmationDetails,
                show: false,
              });
            }}
            className="bg-red-500 px-3 py-2 mr-4 rounded-md">
            <Text className="font-bold text-white">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowConfirmationForText(true);
            }}
            className="bg-orange-500 px-3 py-2 ml-4 rounded-md">
            <Text className="font-bold text-white">Update</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      {confirmationDetails?.show && (
        <>
          <View
            style={{width: screenWidth, height: screenHeight}}
            className={`absolute items-center justify-center z-10 bg-gray-400 opacity-50`}></View>
          <View
            style={{width: screenWidth, height: screenHeight}}
            className="absolute left-0 top-0 z-30 items-center justify-center ">
            <View className="bg-white w-[90%] max-h-[50%] py-5 rounded-md items-center justify-center">
              {confirmationDetails?.type === 'DATE' && renderDateDesign()}
              {confirmationDetails?.type === 'TEXT' &&
                showConfirmationForText === false &&
                renderTextDesign()}
              {confirmationDetails?.type != 'DATE' &&
                showConfirmationForText &&
                renderTextConfirmation()}
              {confirmationDetails?.type === 'PROGRESS' &&
                showConfirmationForText === false &&
                renderPercentageNew()}
              {confirmationDetails?.type === 'PRIORITY' &&
                showConfirmationForText === false &&
                renderPriority()}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default ConfirmationDialog;
