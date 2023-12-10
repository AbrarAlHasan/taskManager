import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {forgetPassword} from '../axios/Authentication/Authentication';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../Navigation/types';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../Store/ToastSlice';

type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProps>();

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

  const handleSendOTP = async () => {
    if (validate()) {
      const response = await forgetPassword(email);
      if (response[0] === 200) {
        navigation.navigate('ResetPass');
      } else {
        dispatch(
          showToastMessage({
            text: 'Please Try Again',
            time: 1500,
            type: 'error',
          }),
        );
      }
    }
    console.log(validate());
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: '#000', marginBottom: 40}}>
        Enter Email to Reset Password
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#c2c2c2"
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSendOTP}>
        <Text style={{color: '#fff'}}>Send OTP</Text>
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

export default ForgotPass;
