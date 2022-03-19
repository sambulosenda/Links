import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
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

import * as ImagePicker from 'expo-image-picker';

export default function Account({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [uploadImage, setUploadImage] = useState('');

  const [image, setImage] = useState({
    url: '',
    public_Id: '',
  });

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

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    //console.log(permissionsResult)
    if (permissionResult.granted === false) {
      alert('Camera access is required');
      return;
    }

    //get Image from image library ()
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);

    let token = state && state.token ? state.token : "";

    // send to backend for uploading to cloudinary
    const { data } = await axios.post(
      '/upload-image',
      {
        image: base64Image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('UPLOADED RESPONSE => ', data);




    //update use info in the context and async storage
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
            source={{ uri: image.url }}
            style={{
              width: 190,
              height: 190,
              marginVertical: 20,
              borderRadius: 100,
            }}
          />
        ) : uploadImage ? (
          <Image
            source={{ uri: uploadImage }}
            style={{
              width: 190,
              height: 190,
              marginVertical: 20,
              borderRadius: 100,
            }}
          />
        ) : (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5 name="camera" size={50} color="orange" />
          </TouchableOpacity>
        )}
      </CircleLogo>

      {image && image.url ? (
        <TouchableOpacity onPress={() => handleUpload()}>
          <FontAwesome5
            name="camera"
            size={50}
            color="orange"
            style={{
              justifyContent: 'center',
              marginTop: -5,
              marginBottom: 10,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}

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
