import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const CreateReminderScreen: React.FC = () => {
	const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [reminderTime, setReminderTime] = useState<string>('');
	const [ error, setError ] = useState<string>('');
	const [ success, setSuccess ] = useState<string>('');
	
	const handleSave = async () => {
		try {
			const response = await axios.post('http://localhost:3000/api/reminders', {
				title,
        description,
        reminder_time: reminderTime,
			});

			setSuccess('')
			setError('')

			if (response.data.success) {
				setSuccess('Reminder created successfully')
				Alert.alert('Success', 'Login Successful!')
				return;
			}
			setError('Reminder failed to create')
			Alert.alert('Error', 'Error with reminder details')
		}
		catch (error) {
			setError('Reminder failed to create')
			Alert.alert('Error', 'Error creating reminder')
		}
	}

	return (
		<View style={styles.container}>
			<CustomTextInput
				placeholder="Title"
				value={title}
				onChangeText={setTitle}
				autoCapitalize="none" 
				autoCorrect={true}
			/>
			<CustomTextInput
				placeholder="Description"
				value={description}
				onChangeText={setDescription}
				autoCapitalize="none" 
				autoCorrect={true}
			/>
			<CustomTextInput
				placeholder="ReminderTime"
				value={reminderTime}
				onChangeText={setReminderTime}
				autoCapitalize="none" 
				autoCorrect={true}
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

export default CreateReminderScreen