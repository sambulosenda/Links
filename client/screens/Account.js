import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import UserInput from '../components/auth/UserInput';
import React, { useState, useContext, useEffect } from 'react';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import CircleLogo from '../components/auth/CircleLogo';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Account({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState({});
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //context
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, image, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('Please fill in all fields');
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
      setState(data);

      //Save response to AsyncStorage
      await AsyncStorage.setItem('@auth', JSON.stringify(data));

      setLoading(false);
      console.log('SIGN IN SUCESSS', data);
      alert('Signup Successful');

      //redirect home
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadfromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem('@auth');
    console.log('DATA FROM ASYNC', data);
  };

  loadfromAsyncStorage();

  return (
    <View style={styles.container}>
      <CircleLogo>
        {image && image.url ? (
          <Image
            source={{uri: image.url}}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
        ) : (
          <FontAwesome5 name="camera" size={100} color="black" />
        )}
      </CircleLogo>
      <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 10 }}>
        {name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'grey',
          fontSize: 15,
          paddingBottom: 10,
        }}
      >
        {email}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'grey',
          fontSize: 10,
          paddingBottom: 10,
        }}
      >
        {role}
      </Text>

      <UserInput
        name="PASSWORD"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="password"
      />

      <SubmitButton
        title="Update Password"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    height: 48,
  },
});
