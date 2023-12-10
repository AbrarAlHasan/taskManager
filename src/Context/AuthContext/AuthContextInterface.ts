import {Dispatch, SetStateAction} from 'react';
import {IUserDetails} from '../../Screens/@Types';

export interface AuthContextType {
  userDetails: any;
  isAuthenticated: any;
  setIsAuthenticated: any;
  setUserDetails: any;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  memberDetails:any,
  setMemberDetails:any,
}

export interface AuthProviderType {
  children: JSX.Element | JSX.Element[];
}
