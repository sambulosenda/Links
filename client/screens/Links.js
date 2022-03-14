import { View, Text, SafeAreaView  } from 'react-native'
import React from 'react'
import FooterTabs from '../components/nav/FooterTabs';
import { AuthContext } from '../context/auth';

const Links = () => {

    const [state, setState] = useContext(AuthContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Text>Account</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <FooterTabs />
        </View>
      </SafeAreaView>
    )
}

export default Links