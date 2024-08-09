import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

interface Reminder {
	id: number;
	title: string;
	description?: string;
	reminder_time: Date;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
	const [reminders, setReminders] = useState<Reminder[]>([]);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	useEffect(() => {
		const fetchReminders = async () => {
			try {
				const response = await axios.get<{ success: boolean, reminders: Reminder[] }>('http://localhost:3000/api/reminders');

				if (response.data.success) {
					setReminders(response.data.reminders)
					Alert.alert('Success', 'Reminders fetched successfully!')
					return;
				}
				setError('failed to fetch reminders')
				Alert.alert('Error', 'Error with Login details')
			}
			catch (error) {
				setSuccess('')
				setError('Login failed')
				Alert.alert('Error', 'Error with login process')
			}
		}
		fetchReminders();
	}, []);

	return (
		<View style={styles.container}>
			<CustomButton title="+ Reminder" onPress={() => navigation.navigate('Create Reminder')} />
			{success ? <Text style={styles.success}>{success}</Text> : null}
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<FlatList
				data={reminders}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
						{item.description ? <Text>{item.description}</Text> : null}
						<Text>{item.reminder_time.toString()}</Text>
					</View>
				)}
				testID="reminder-list"
			/>
		</View>
	);
};

//basic tempporary AI generated stylings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reminderItem: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});

export default HomeScreen