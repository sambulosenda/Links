import { Text, SafeAreaView, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SubmitButton from '../components/auth/SubmitButton';
import FooterTabs from '../components/nav/FooterTabs';
import ogs from '@uehreka/open-graph-scraper-react-native';
import urlRegex from 'url-regex';
import PreviewCard from '../components/links/PreviewCard';

const PostLink = () => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);

      if (urlRegex({ exact: true }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          //console.log('results:', results); // This contains all of the Open Graph results
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log('Title and link => ', title, link);
    console.log(urlPreview);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        {urlPreview.success && (
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <PreviewCard   {...urlPreview}/>
          </View>
        )}

        <View style={{ paddingTop: 30 }}>
          <SubmitButton title="Submit" handleSubmit={handleSubmit} />
        </View>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

export default PostLink;
