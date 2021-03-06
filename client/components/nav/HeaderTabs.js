import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderTabs = () => {

  const [state, setState ] = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: '', user: null });
    await AsyncStorage.removeItem('@auth');
  };

  return (
   
      <TouchableOpacity onPress={signOut}>
        <FontAwesome5
          name="sign-out-alt"
          size={25}
          color="#ff9900"
          style={{ marginBottom: 3, alignSelf: 'center' }}
        />
      </TouchableOpacity>
    
  );
};

export default HeaderTabs;

const styles = StyleSheet.create({});
