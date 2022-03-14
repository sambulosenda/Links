import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import FooterTabs from '../components/nav/FooterTabs';
import { AuthContext } from '../context/auth';


const Post = () => {

    const [state, setState] = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Text>Post</Text>
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <FooterTabs />
    </View>
  </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({})