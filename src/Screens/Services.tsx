import {Pressable, StyleSheet, Text, View, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';

const Services = () => {
  useEffect(() => {
    createChannel();
    return () => {
      console.log('Closed');
    };
  }, []);

  const [positionCoordinates, setPositionCoordinates] = useState([]);

  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const stopBackgroundService = async () => {
    console.log(positionCoordinates);
    await BackgroundService.stop();
  };

  const sleep = (time: number) =>
    new Promise<void>(resolve =>
      setTimeout(() => {
        return resolve();
      }, time),
    );

  const veryIntensiveTask = async (taskDataArguments: any) => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        if (i % 3 === 0) {
          console.log(AppState.currentState, AppState.isAvailable);

          console.log('Location is Fetched', i, i % 3);
          Geolocation.getCurrentPosition(async position => {
            setPositionCoordinates((prevState): any => {
              return [
                ...prevState,
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              ];
            });
          });
        }
        await BackgroundService.updateNotification({
          taskDesc: 'Test Drive Location is Fetching and your Duration is ',
        });
        await sleep(1000);
      }
    });
  };

  const options = {
    taskName: 'Your Location is Being Tracked',
    taskTitle: 'Test Drive Route is Tracking',
    taskDesc:
      'Your Test Drive Route with the Customer is being Tracked by this Application',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  const startForegroundService = async () => {
    const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Task Manager Foreground Service is Running',
      text: 'Running',
      icon: 'ic_icon',
      button: 'Hello',
    };
    try {
      await VIForegroundService.getInstance().startService(notificationConfig);
    } catch (e) {
      console.log(e);
    }
  };

  const stopForegroundService = async () => {
    await VIForegroundService.getInstance().stopService();
  };

  const createChannel = async () => {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
    };
    await VIForegroundService.getInstance().createNotificationChannel(
      channelConfig,
    );
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          startForegroundService();
        }}
        style={{
          backgroundColor: 'red',
          width: '70%',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Start the Foreground Service</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          stopForegroundService();
        }}
        style={{
          backgroundColor: 'red',
          width: '70%',
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text style={{color: 'white'}}>Stop the Foreground Service</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          startBackgroundService();
        }}
        style={{
          backgroundColor: 'green',
          width: '70%',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Start the Background Service</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          stopBackgroundService();
        }}
        style={{
          backgroundColor: 'green',
          width: '70%',
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text style={{color: 'white'}}>Stop the Background Service</Text>
      </Pressable>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
