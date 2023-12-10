import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {otpVerify} from '../axios/Authentication/Authentication';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Navigation/types';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../Store/ToastSlice';

type OtpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'OTP'
>;

type OtpProps = {
  navigation: OtpScreenNavigationProp;
  route: {params: {pageType: string}};
};

const OTP = ({navigation, route}: OtpProps) => {
  const {pageType} = route.params;
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const validate = () => {
    if (!otp) {
      dispatch(
        showToastMessage({text: 'Please Enter OTP', time: 1500, type: 'error'}),
      );

      return false;
    }
    return true;
  };

  const handleVerifyOtp = async () => {
    try {
      if (validate()) {
        const response = await otpVerify(Number(otp));
        if (response[0] === 200) {
          dispatch(
            showToastMessage({
              text: 'OTP Verified',
              time: 1500,
              type: 'success',
            }),
          );

          if (pageType === 'signUp' || pageType === 'login') {
            navigation.navigate('Login');
          }
          if (pageType === 'forgotPass') {
            navigation.navigate('ResetPass');
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: '#000', marginBottom: 40}}>
        Enter OTP send in Email
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="OTP"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setOtp(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleVerifyOtp}>
        <Text style={{color: '#fff'}}>Validate OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0ded7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#9e7b00',
    borderRadius: 25,
    height: 64,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  inputText: {},
});

export default OTP;
