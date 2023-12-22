import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tag from '../Components/Tag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {setAuthenticated, setUserDetails} from '../Store/Authentication';
import {showToastMessage} from '../Store/ToastSlice';
import messaging from '@react-native-firebase/messaging';

const Profile = () => {
  const {userDetails} = useSelector(
    (store: AuthState) => store.authenticationReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('fcmToken');
      dispatch(
        showToastMessage({
          text: 'Log Out Success',
          time: 1500,
          type: 'success',
        }),
      );
      dispatch(setUserDetails(null));
      dispatch(setAuthenticated(false));
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="w-full items-center justify-center flex-row relative mb-3">
        <Text className="text-lg font-bold  text-black">Profile</Text>
      </View>
      <View className="items-center justify-center mt-10">
        <View className="w-32 h-32 bg-gray-400 rounded-full"></View>
        <View className=" items-center gap-2 mt-3">
          <Text className="font-bold text-xl  text-black">
            {userDetails?.name}
          </Text>
          <Text className=" text-black">{userDetails?.email}</Text>
        </View>
        <Pressable className="mt-5" onPress={handleLogout}>
          <Tag content="Logout" color="random" classStyle="text-xl px-2" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
