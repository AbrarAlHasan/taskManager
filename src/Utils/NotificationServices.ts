import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {ToastMessage} from './ToastNotification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    // getFcmToken();
  }
}

export const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old Token', checkToken);
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      if (!!fcmToken) {
        // save the token to the db
        console.log('FCM Token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (err: any) {
      console.log('Error in FCM Token', err);
      ToastMessage(err.message);
    }
  }
};
