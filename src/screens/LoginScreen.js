import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
	const [ Email, setEmail ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ Error, setError ] = useState('');
	const [ Success, setSuccess ] = useState('');

	const handleLogin = () => {
		//Api request
	}

	return (
		<View />
	)
}