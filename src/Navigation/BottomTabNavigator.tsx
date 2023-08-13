import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import TaskDetails from '../Screens/TaskDetails';
import TaskList from '../Screens/TaskList';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import HomeIcon from '../Assets/HomeIcon.svg';
import {bottomTabRoutes} from './RouteDetails';
import {useEffect} from 'react';

const Tab = createBottomTabNavigator();

export default function BottomTabBar({navigation, route}: any) {
  return (
    <Tab.Navigator
      initialRouteName="Dashboards"
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomBarStyle {...props} />}>
      {bottomTabRoutes?.map((data, idx) => {
        return (
          <Tab.Screen
            key={idx}
            name={data?.routeName}
            component={data?.component}
            options={{
              tabBarStyle: {display: 'none'},
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const BottomBarStyle = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View className="w-full px-5 h-14 relative bottom-7 flex-row items-center justify-center">
      <View className="flex-1 h-full w-9/12 bg-white shadow-sm shadow-slate-800 flex-row rounded-md">
        {bottomTabRoutes?.map((item, idx) => {
          const center = Math.round(bottomTabRoutes.length / 2) == idx + 1;
          return (
            <TouchableOpacity
              key={idx}
              className={`flex-1 mx-2 items-center justify-center  ${
                state.index == idx && 'scale-125'
              }`}
              onPress={() => {
                if (item.routeName === 'AddTask') {
                  navigation.navigate('AddTaskN');
                } else {
                  navigation.navigate(item?.routeName);
                }
              }}>
              <item.icon />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
