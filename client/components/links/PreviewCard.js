import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const PreviewCard = ({
  ogTitle = 'Untitled',
  ogDescription = 'no description found',
  ogImage = 'https://via.placeholder.com/500x500.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide',
}) => {
  return (
    <View
      style={{
        width: '92%',
        backgroundColor: 'white',
        height: 280,
        borderRadius: '14px',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: ogImage.url }}
        style={{
          width: '100%',
          height: '70%',
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
        }}
      />
      <TouchableOpacity>
        <View style={{padding: 5, height: 50}}>
          <Text style={{paddingTop: 5, paddingBottom: 5, fontWeight: 'bold' }}>{ogTitle}</Text>
          <Text>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewCard;
