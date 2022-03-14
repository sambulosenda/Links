import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import UserInput from "../components/auth/UserInput";
import React, { useState, useContext } from "react";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";


export default function Login({ navigation }) {
  const [email, setEmail] = useState("sambulosen@gmail.com");
  const [password, setPassword] = useState("sambulo");
  const [loading, setLoading] = useState(false);
  //context 
  const [state, setState ] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }
    // console.log("SIGNUP REQUEST", name, email, password);
    try {
      const { data } = await axios.post(`/signin`, {
        email,
        password,
      });

      //save in context
      setState(data)

      //Save response to AsyncStorage
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
    

      setLoading(false);
      console.log("SIGN IN SUCESSS", data);
      alert("Signup Successful");

      //redirect home 
      navigation.navigate("Home");


    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };



  const loadfromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem('@auth');
    console.log("DATA FROM ASYNC", data);
  }

  loadfromAsyncStorage();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center" }}>Login</Text>

      <UserInput
        name="EMAIL"
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <UserInput
        name="PASSWORD"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"
      />

      <SubmitButton
        title="Login"
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Not yet registered?{" "}
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={{ color: "#ff2222" }}
        >
          Register
        </Text>{" "}
      </Text>

      <Text style={{ textAlign: "center", marginTop: 10, color: "orange" }}>
        Forgot password
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    height: 48,
  },
});
