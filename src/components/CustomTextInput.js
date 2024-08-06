import React from 'react';
import { TextInput } from 'react-native';

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

export default CustomTextInput;