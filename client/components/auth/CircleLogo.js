import React from 'react';
import { View, Image } from 'react-native';

const CircleLogo = ({ children }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 50,
    }}
  >
    <View
      style={{
        backgroundColor: '#fff',
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderColor: '#f8f8f8',
          borderWidth: '4',
          height: 190,
          width: 190,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            source={require('../../assets/favicon.png')}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
        )}
      </View>
    </View>
  </View>
);

export default CircleLogo;
