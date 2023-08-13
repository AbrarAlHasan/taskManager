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
import { otpVerify } from "../axios/Authentication";
const OTP = ({ route }) => {
  const { pageType } = route.params;
  const [otp, setOtp] = useState("");

  const navigation = useNavigation();

  const validate = () => {
    if (!otp) {
      ToastMessage("Please Enter OTP");
      return false;
    }
    return true;
  };

  const handleVerifyOtp = async () => {
    try {
      if (validate()) {
        const response = await otpVerify(Number(otp));
        if (response[0] === 200) {
          ToastMessage("OTP Verified");
          console.log(response);
          if (pageType === "signUp" || pageType === "login") {
            navigation.navigate("Login");
          }
          if (pageType === "forgotPass") {
            navigation.navigate("ResetPass");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "#000", marginBottom: 40 }}>
        Enter OTP send in Email
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleVerifyOtp}>
        <Text style={{ color: "#fff" }}>Validate OTP</Text>
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

export default OTP;
