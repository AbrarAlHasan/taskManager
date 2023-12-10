import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from '../Utils/ToastNotification';

export interface IAuthentication {
  isAuthenticated: Boolean;
  userDetails: any;
  memberDetails: any;
}

const initialState: IAuthentication = {
  isAuthenticated: false,
  userDetails: null,
  memberDetails: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    setUserDetails: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
    setMemberDetails: (state, action) => {
      return {
        ...state,
        memberDetails: action.payload,
      };
    },
    logoutUser: (state, action) => {
      ToastMessage('Session Expired.Please Login Again')
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('accessToken');
      return {
        ...state,
        memberDetails: null,
        userDetails: null,
        isAuthenticated: false,
      };
    },
  },
});

export const {setAuthenticated, setUserDetails, setMemberDetails, logoutUser} =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
