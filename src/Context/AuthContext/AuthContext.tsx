import React, {createContext, useEffect, useState} from 'react';
import {AuthContextType, AuthProviderType} from './AuthContextInterface';
import {
  checkSession,
  loginUser,
} from '../../axios/Authentication/Authentication';
import {IUserDetails} from '../../Screens/@Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../Utils/ToastNotification';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({children}: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memberDetails,setMemberDetails] = useState("")

  const navigation = useNavigation<any>()

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        const response: any = await checkSession(refreshToken);
        if (response[0] === 200) {
          await AsyncStorage.setItem('accessToken',response[1].accessToken)
          const decoded: any = await jwtDecode(response[1].accessToken);
          setUserDetails(decoded.details);
          setIsAuthenticated(true);
        }
        if (response[0] === 401) {
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('accessToken');
          setUserDetails(null)
          setIsAuthenticated(false)
          ToastMessage('Session Expired! Please Login Again');
        }
      }
    } catch (err: any) {
      console.log('Error', err.message);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('accessToken');
      setUserDetails(null);
      setIsAuthenticated(false);
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    setUserDetails,
    userDetails,
    isLoading,
    setIsLoading,
    memberDetails,
    setMemberDetails,
    handleLogout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
