import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, autoCapitalize, autoCorrect }) => (
	<TextInput style={styles.input}
		placeholder={placeholder}
		value={value}
		onChangeText={onChangeText}
		secureTextEntry={secureTextEntry}
		autoCapitalize={autoCapitalize}
		autoCorrect={autoCorrect}
	/>
);

//basic tempporary AI generated stylings
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CustomTextInput;