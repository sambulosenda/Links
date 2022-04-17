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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }
    
    console.log("SIGNUP REQUEST", name, email, password);
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
      });

      //save in context
      setState(data);
      //Save response to AsyncStorage
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

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

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: "center" }}>Signup</Text>

      <UserInput
        name="NAME"
        value={name}
        setValue={setName}
        autoCapitalize="words"
        autoCorrect={false}
      />
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
        title="Signup"
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <Text style={{ textAlign: "center" }}>
        Already joined?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: "#ff2222" }}
        >
          Sign In
        </Text>{" "}
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
