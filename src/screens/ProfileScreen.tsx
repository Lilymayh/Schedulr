import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TextInput } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

interface ProfileScreenState {
	avatar: string;
	firstName: string;
	lastName: string;
	error: string;
	success: string;
}

const ProfileScreen: React.FC = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [avatar, setAvatar] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const handleSave = async () => {
		try {
			const response = await axios.put('https://localhost:3000/profiles/${userId}', {
				avatar,
				first_name: firstName,
				last_name: lastName
			});

			setSuccess('')
			setError('')

			if (response.status === 200) {
				setSuccess('Profile Updated Successfully')
				Alert.alert('Success', 'Profile Updated Successfully!')
				return;
			}
			setError('Profile update failed')
			Alert.alert('Error', 'Error with profile details')
		}
		catch (error) {
			setSuccess('')
			setError('Profile update failed')
			Alert.alert('Error', 'Error with profile update process')
		}
	}

	return (
		<View>
			<CustomTextInput
				placeholder="Avatar"
				value={avatar}
				onChangeText={setAvatar}
			/>
			<CustomTextInput
				placeholder="First Name"
				value={firstName}
				onChangeText={setFirstName}
			/>
			<CustomTextInput
				placeholder="Last Name"
				value={lastName}
				onChangeText={setLastName}
			/>
			<CustomButton title="Save" onPress={handleSave} />
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


export default ProfileScreen;