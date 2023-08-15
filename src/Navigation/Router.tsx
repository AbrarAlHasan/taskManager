import {useContext} from 'react';
import {AuthContext} from '../Context/AuthContext/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import AddProject from '../Screens/AddProject';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import Dashboard from '../Screens/Dashboard';

const Router = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <Dashboard /> : <AuthStack />} */}
      {/* <AuthStack /> */}
      <MainStack />
    </NavigationContainer>
  );
};

export default Router;
