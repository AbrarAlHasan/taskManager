import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {resetPassword} from '../axios/Authentication/Authentication';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../Store/ToastSlice';
const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rePass, setRePass] = useState('');
  const [showRePass, setShowRePass] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const validate = () => {
    if (!otp) {
      dispatch(
        showToastMessage({text: 'Please Enter OTP', time: 1500, type: 'error'}),
      );
      return false;
    }
    if (!password) {
      dispatch(
        showToastMessage({
          text: 'Please Enter Password',
          time: 1500,
          type: 'error',
        }),
      );
      return false;
    }
    if (rePass != password) {
      dispatch(
        showToastMessage({
          text: 'Please Enter PasswordPassword and Re Enter Password is not same',
          time: 1500,
          type: 'error',
        }),
      );
      return false;
    }
    return true;
  };

  const handleResetPass = async () => {
    if (validate()) {
      const response = await resetPassword({otp, password});
      if (response[0] === 200) {
        dispatch(
          showToastMessage({
            text: 'Password Changed Successfully',
            time: 1500,
            type: 'success',
          }),
        );
        navigation.navigate('Login');
      }
    }
    console.log(validate());
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, color: '#000'}}>Welcome</Text>
      <Text style={{fontSize: 20, color: '#000', marginBottom: 40}}>
        Reset Password
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="OTP"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setOtp(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPass}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => setShowPass(!showPass)}>
          <Text>{showPass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Re Enter Password"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setRePass(text)}
          secureTextEntry={!showRePass}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => setShowRePass(!showRePass)}>
          <Text>{showRePass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleResetPass}>
        <Text style={{color: '#fff'}}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{color: '#000'}}>Go Back to Login</Text>
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

export default ResetPass;
