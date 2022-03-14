import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../../screens/Signup';
import Login from '../../screens/Login';
import Home from '../../screens/Home';
import Links from '../../screens/Links';
import Post from '../../screens/Post';

import { AuthContext } from '../../context/auth';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== '' && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Account"
      //screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Links Daily',
              headerRight: () => <HeaderTabs />,
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: 'Back',
            }}
          />

          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              headerBackTitle: 'Back',
            }}
          />

          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: 'Back',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
