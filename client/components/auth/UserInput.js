import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default function UserInput({
  name,
  value,
  setValue,
  autoCapitalize = 'none',
  secureTextEntry = false,
  keyboadType = 'default',
}) {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text style={{ fontWeight: '300', fontSize: 12 }}>{name}</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboadType}
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
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
    marginBottom: 30,
  },
});
