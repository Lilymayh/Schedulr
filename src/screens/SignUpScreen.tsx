import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

interface SignUpScreenState {
  email: string;
  password: string;
  error: string;
  success: string;
}

const SignUpScreen: React.FC = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');

	interface SignUpResponse {
    success: boolean;
  }

	const handleSignUp = async () => {
		try {
			const response = await axios.post<SignUpResponse>('http://localhost:3000/api/users', {
				email,
				password
			});

			setSuccess('')
			setError('')

			if (response.data.success) {
				setSuccess('Sign up Successful')
				Alert.alert('Success', 'Registeration Successful!')
				return;
			}
			setError('Sign up failed')
			Alert.alert('Error', 'Error with Registeration details')
		}
		catch (error) {
			setSuccess('')
			setError('Sign up failed')
			Alert.alert('Error', 'Error with Registeration process')
		}
	}

	return (
		<View style={styles.container}>
			<CustomTextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<CustomTextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<CustomButton title="Register" onPress={handleSignUp} />
			{success ? <Text style={styles.success}>{success}</Text> : null}
			{error ? <Text style={styles.error}>{error}</Text> : null}
		</View>
	)
}

//basic tempporary AI generated stylings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
	success: {
    color: 'green',
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default SignUpScreen