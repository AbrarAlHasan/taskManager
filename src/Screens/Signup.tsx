import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createUser} from '../axios/Authentication/Authentication';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Navigation/types';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../Store/ToastSlice';
type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;
const Login = () => {
  const [email, setEmail] = useState('abraralhasan111@gmail.com');
  const [password, setPassword] = useState('abrar');
  const [showPass, setShowPass] = useState(false);
  const [rePass, setRePass] = useState('abrar');
  const [showRePass, setShowRePass] = useState(false);
  const [name, setName] = useState('Abrar Al Hasan');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();

  const validate = () => {
    if (!name) {
      dispatch(
        showToastMessage({
          text: 'Please Enter Name',
          time: 1500,
          type: 'error',
        }),
      );

      return false;
    }
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
    if (rePass != password) {
      dispatch(
        showToastMessage({
          text: 'Password and Re Enter Password is not same',
          time: 1500,
          type: 'error',
        }),
      );

      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      if (validate()) {
        const response = await createUser({name, email, password});
        console.log(response);
        if (response[0] === 200) {
          console.log(response[1]);
          dispatch(
            showToastMessage({
              text: 'Please Verify the OTP Send over Email',
              time: 1500,
              type: 'success',
            }),
          );
          navigation.navigate('OTP', {pageType: 'signUp'});
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
        Enter Your Details to Signup
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setName(text)}
          value={name}
        />
      </View>

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
          autoCapitalize="none"
          value={password}
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
          autoCapitalize="none"
          value={rePass}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => setShowRePass(!showRePass)}>
          <Text>{showRePass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{color: '#000'}}>Already User ? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
        <Text style={{color: '#fff'}}>Signup</Text>
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
