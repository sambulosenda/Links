import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9900',
        height: 50,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontWeight: '500', fontSize: 20, alignItems: 'center' }}>
        {loading ? 'Please wait... ' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
