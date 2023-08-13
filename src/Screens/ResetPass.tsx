import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ToastMessage } from "../Utils/ToastNotification";
import { useNavigation } from "@react-navigation/native";
import { resetPassword } from "../axios/Authentication";
const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rePass, setRePass] = useState("");
  const [showRePass, setShowRePass] = useState(false);
  const [otp, setOtp] = useState("");

  const navigation = useNavigation();

  const validate = () => {
    if (!otp) {
      ToastMessage("Please Enter OTP");
      return false;
    }
    if (!password) {
      ToastMessage("Please Enter Password");
      return false;
    }
    if (rePass != password) {
      ToastMessage("Password and Re Enter Password is not same");
      return false;
    }
    return true;
  };

  const handleResetPass = async () => {
    if (validate()) {
      const response = await resetPassword({ otp, password });
      if (response[0] === 200) {
        ToastMessage("Password Changed Successfully");
        navigation.navigate("Login");
      }
    }
    console.log(validate());
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, color: "#000" }}>Welcome</Text>
      <Text style={{ fontSize: 20, color: "#000", marginBottom: 40 }}>
        Reset Password
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="OTP"
          placeholderTextColor="#c2c2c2"
          color="#fff"
          onChangeText={(text) => setOtp(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#c2c2c2"
          color="#fff"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPass}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => setShowPass(!showPass)}
        >
          <Text>{showPass ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Re Enter Password"
          placeholderTextColor="#c2c2c2"
          color="#fff"
          onChangeText={(text) => setRePass(text)}
          secureTextEntry={!showRePass}
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10 }}
          onPress={() => setShowRePass(!showRePass)}
        >
          <Text>{showRePass ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleResetPass}>
        <Text style={{ color: "#fff" }}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#000" }}>Go Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0ded7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#9e7b00",
    borderRadius: 25,
    height: 64,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  inputText: {},
});

export default ResetPass;
