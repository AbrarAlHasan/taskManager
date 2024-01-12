import messaging from '@react-native-firebase/messaging';
import {
  useNavigation,
  CommonActions,
  NavigationAction,
} from '@react-navigation/native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const notificationListener = async (
  navigation?: any,
  setLoading?: any,
  setInitialRoute?: any,
) => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp((remoteMessage: any) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );

    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage: any) => {
      console.log('Click Triggered in Background');
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Dashboard'}, {name: 'Messaging'}],
      });
      // navigation.dispatch(CommonActions.navigate('Messaging'));
      // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      //   setLoading(false);
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  // save the token to the db
  console.log(token);
};
