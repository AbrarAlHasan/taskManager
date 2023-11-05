import {ToastAndroid, Platform, Alert} from 'react-native';
export const ToastMessage = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

export const accessDeniedToastMessage = () => {
  ToastMessage('Access Denied Please Contact Owner');
};
