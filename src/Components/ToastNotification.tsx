import {
  View,
  Text,
  Platform,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState} from '../Store';
import {hideToast} from '../Store/ToastSlice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const {showToast, text, time, type} = useSelector(
    (store: AuthState) => store.toast,
  );
  interface ItypeDetails {
    success: {container: string; text: string};
    warning: {container: string; text: string};
    error: {container: string; text: string};
  }

  const typeDetails: ItypeDetails = {
    success: {
      container: 'bg-[#def1d7] border-[#1f8722]',
      text: 'text-[#1f8722]',
    },
    warning: {
      container: 'bg-[#fef7ec] border-[#f08135]',
      text: 'text-[#f08135]',
    },
    error: {
      container: 'bg-[#fae1db] border-[#d9100a]',
      text: 'text-[#d9100a]',
    },
  };
  const marginTop = Platform.OS === 'android' ? 20 : 60;

  const [translateY] = useState(new Animated.Value(marginTop));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (showToast) {
      // Animated.timing(translateY, {
      //   toValue: 0,
      //   duration: 300,
      //   easing: Easing.ease,
      //   useNativeDriver: true,
      // }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();

      const timeoutId = setTimeout(() => {
        hideToastHandler();
      }, time);
    } else {
      // opacity.setValue(0);
      translateY.setValue(marginTop);
    }
  }, [showToast]);

  const hideToastHandler = () => {
    Animated.timing(translateY, {
      toValue: -200,
      duration: 300, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Dispatch action to hide toast after animation completion
      dispatch(hideToast(''));
    });
  };

  const checkType = () => {
    return typeDetails[type];
  };

  return (
    <>
      {showToast && (
        <Animated.View
          className={`w-[100%] top-[${marginTop}px] left-0 absolute items-center justify-center`}
          style={{transform: [{translateY}], opacity}}>
          <View
            className={`px-3 py-2 max-w-[85%] rounded-xl border-[1px] items-center justify-center ${
              checkType().container
            }`}>
            <Text className={`font-bold  ${checkType().text}`}>{text}</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ToastNotification;
