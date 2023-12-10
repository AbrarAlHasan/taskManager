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

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({children}: AuthProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memberDetails,setMemberDetails] = useState("")


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
  

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    setUserDetails,
    userDetails,
    isLoading,
    setIsLoading,
    memberDetails,
    setMemberDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
