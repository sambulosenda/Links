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
import React, { useState, useContext } from 'react';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../context/auth';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState('');

  //context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      alert('Please enter your email');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('/forgot-password', {
        email,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setVisible(true);
        console.log('RESET PASSWORD RES => ', data);
        alert('Email sent');
      }
    } catch (err) {
      alert('Error sending email. Try again.');

      console.log(err);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    //console.log('RESET PASSWORD REQUEST', email, resetCode, password);
    try {
      const { data } = await axios.post('/reset-password', {
        email,
        password,
        resetCode,
      });
      console.log('RESET PASSWORD RES => ', data);
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert('Password updated');
        setLoading(false);
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert('Error resetting password. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textAlign: 'center' }}>Forgot Password</Text>

      <UserInput
        name="EMAIL"
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />

      {visible && (
        <>
          <UserInput
            name="NEW PASSWORD"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCompleteType="password"
          />

          <UserInput
            name="PASSWORD RESET CODE"
            value={resetCode}
            setValue={setResetCode}
            secureTextEntry={true}
          />
        </>
      )}

      <SubmitButton
        title={visible ? 'Reset Password' : 'Request Reset Code'}
        handleSubmit={visible ? handlePasswordReset : handleSubmit}
        loading={loading}
      />

      <Text
        onPress={() => navigation.navigate('Login')}
        style={{ textAlign: 'center', marginTop: 10, color: 'orange' }}
      >
        Sign In
      </Text>
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
