import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../axios/Authentication/Authentication';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Navigation/types';
import {useSelector, useDispatch} from 'react-redux';
import {setAuthenticated, setUserDetails} from '../Store/Authentication';
import {showToastMessage} from '../Store/ToastSlice';
type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();

  useEffect(() => {
    const getLoginCredentials = async () => {
      const jsonValue = await AsyncStorage.getItem('loginCredential');
      if (jsonValue) {
        const parsedData = await JSON.parse(jsonValue);
        setEmail(parsedData?.email);
        setPassword(parsedData?.password);
      }
    };
    getLoginCredentials();
  }, []);

  const validate = () => {
    if (!email) {
      dispatch(
        showToastMessage({
          text: 'Please Enter Email',
          time: 1500,
          type: 'error',
        }),
      );

      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email.trim()) === false) {
      dispatch(
        showToastMessage({text: 'Email Invalid', time: 1500, type: 'error'}),
      );

      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (validate()) {
        const response: any = await loginUser({email, password});
        if (response[0] === 200) {
          dispatch(
            showToastMessage({
              text: 'Login Success',
              time: 1500,
              type: 'success',
            }),
          );
          await AsyncStorage.setItem(
            'loginCredential',
            JSON.stringify({email, password}),
          );
          const decoded: any = await jwtDecode(response[1].accessToken);
          dispatch(setUserDetails(decoded?.details));
          await AsyncStorage.setItem('refreshToken', response[1].refreshToken);
          await AsyncStorage.setItem('accessToken', response[1].accessToken);
          dispatch(setAuthenticated(true));
        }
        if (response[0] === 401) {
          dispatch(
            showToastMessage({
              text: 'Account Not Verified. Please Verify the Account',
              time: 1500,
              type: 'error',
            }),
          );

          // navigation.navigate('OTP', {pageType: 'login'});
        }
        if (response[0] === 402) {
          dispatch(
            showToastMessage({
              text: 'Incorrect Email or Password',
              time: 1500,
              type: 'error',
            }),
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, color: '#000'}}>Welcome</Text>
      <Text style={{fontSize: 20, color: '#000', marginBottom: 40}}>
        Please login to Continue
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#c2c2c2"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPass}
          value={password}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => setShowPass(!showPass)}>
          <Text>{showPass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={{color: '#000'}}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={{color: '#fff'}}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{color: '#000'}}>New User ? Signup</Text>
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

export default Login;
