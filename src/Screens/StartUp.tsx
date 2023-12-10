import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  CommonActions,
  NavigationAction,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, MainStackParamList} from '../Navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {checkSession} from '../axios/Authentication/Authentication';
import jwtDecode from 'jwt-decode';
import {
  logoutUser,
  setAuthenticated,
  setMemberDetails,
  setUserDetails,
} from '../Store/Authentication';
import {ToastMessage} from '../Utils/ToastNotification';

const StartUp = () => {
  const {isAuthenticated} = useSelector(
    (state: AuthState) => state.authenticationReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const fetchUser = async () => {
    try {
      let refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        const response: any = await checkSession(refreshToken);
        if (response[0] === 200) {
          await AsyncStorage.setItem('accessToken', response[1].accessToken);
          const decoded: any = await jwtDecode(response[1].accessToken);
          dispatch(setUserDetails(decoded.details));
          dispatch(setAuthenticated(true));
        }
        if (response[0] === 401) {
          dispatch(logoutUser(''));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Login'}],
            }),
          );
        }
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
      }
    } catch (err: any) {
      console.log('Error', err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {

    if (isAuthenticated) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
    } else {

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),
      );
    }
  }, [isAuthenticated]);
  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-5xl">TASK MANAGER</Text>
      <Text className="text-lg">Powered By</Text>
      <Text className="text-sm">Abrar Al Hasan</Text>
    </View>
  );
};

export default StartUp;
