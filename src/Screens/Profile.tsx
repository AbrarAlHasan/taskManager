import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import Tag from '../Components/Tag';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {userDetails, setUserDetails, setIsAuthenticated} =
    useContext(AuthContext);
  console.log(userDetails);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('refreshToken');
      setUserDetails(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <View className="w-full items-center justify-center flex-row relative mb-3">
        <Text className="text-lg font-bold">Profile</Text>
      </View>
      <View className="items-center justify-center mt-10">
        <View className="w-32 h-32 bg-gray-400 rounded-full"></View>
        <View className=" items-center gap-2 mt-3">
          <Text className="font-bold text-xl">{userDetails?.name}</Text>
          <Text>{userDetails?.email}</Text>
        </View>
        <Pressable className="mt-5" onPress={handleLogout}>
          <Tag content="Logout" color="random" classStyle="text-xl px-2" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
