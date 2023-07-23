import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../Navigation/types';
import Card from '../Components/Card';
type NavigationProps = NativeStackNavigationProp<MainStackParamList>;
const Dashboard = () => {
  const navigation = useNavigation<NavigationProps>();
  const projects = [2, 43, 4, 23, 4, 23, 4, 4, 3];

  return (
    <SafeAreaView className="px-3 bg-gray-100 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {projects?.map(() => (
          <Card />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
