import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const LoginScreen = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');

	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:3000/api/login', {
				email,
				password
			});

			setSuccess('')
			setError('')

			if (response.data.success) {
				setSuccess('Login Successful')
				Alert.alert('Success', 'Login Successful!')
				return;
			}
			setError('Login failed')
			Alert.alert('Error', 'Error with Login details')
		}
		catch (error) {
			setSuccess('')
			setError('Login failed')
			Alert.alert('Error', 'Error with login process')
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
			<CustomButton title="Log In" onPress={handleLogin} />
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

export default LoginScreen