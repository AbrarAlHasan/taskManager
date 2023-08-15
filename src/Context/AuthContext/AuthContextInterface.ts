import {IUserDetails} from '../../Screens/@Types';

export interface AuthContextType {
  userDetails: any;
  isAuthenticated: any;
  setIsAuthenticated: any;
  setUserDetails: any;
}

export interface AuthProviderType {
  children: JSX.Element | JSX.Element[];
}
