import {useContext} from 'react';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import AddProject from '../Screens/AddProject';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import Dashboard from '../Screens/Dashboard';
import {useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Router = () => {
  const isAuthenticated = useSelector(
    (state: AuthState) => state.authenticationReducer.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
