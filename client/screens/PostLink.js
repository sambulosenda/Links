import { Text, SafeAreaView, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SubmitButton from '../components/auth/SubmitButton';
import FooterTabs from '../components/nav/FooterTabs';

const PostLink = () => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);
      setTimeout(() => {
        console.log('Link: ', link);
      }, 1000);
    } catch {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
      console.log("Title and link => ", title, link);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ textAlign: 'center', paddingTop: 30 }}>
          Past Website URL
        </Text>
        <TextInput
          value={link}
          placeholder="Paste your link here"
          onChangeText={(text) => handleChange(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderColor: 'grey',
            borderWidth: 1,
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}
        />

        <TextInput
          value={title}
          placeholder="Write Title"
          onChangeText={(text) => setTitle(text)}
          autoCapitalize="sentences"
          autoCorrect={false}
          style={{
            borderColor: 'grey',
            borderWidth: 1,
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}
        />

        <View style={{paddingTop: 30}}>
          <SubmitButton
            title="Submit"
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
};

export default PostLink;
