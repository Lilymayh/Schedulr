import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const SignUpScreen = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');

	return (
		<View>
			
		</View>
	)
};

export default SignUpScreen;