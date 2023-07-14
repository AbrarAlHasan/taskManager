import {
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
  return (
    <SafeAreaView>
      <Card />
    </SafeAreaView>
  );
};

export default Dashboard;
