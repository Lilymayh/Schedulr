import React from 'react';
import { render, fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import CreateReminderScreen from '../../src/screens/CreateReminderScreen';
import axios from 'axios';

jest.mock('axios');

//Add mock response
interface AxiosResponse {
  data: {
    success: boolean;
		reminder?: { id: number, text: string }[];
  };
}

test('should render reminder screen with elements', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI = render(<CreateReminderScreen />);

	expect(getByPlaceholderText('Title')).toBeTruthy();
  expect(getByPlaceholderText('Description')).toBeTruthy();
  expect(getByPlaceholderText('ReminderTime')).toBeTruthy();
  expect(getByText('Save')).toBeTruthy();
})

test('should submit form successfully', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI  = render(<CreateReminderScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: true }
	} as AxiosResponse);

	fireEvent.changeText(getByPlaceholderText('Title'), 'New Reminder');
  fireEvent.changeText(getByPlaceholderText('Description'), 'Reminder description');
  fireEvent.changeText(getByPlaceholderText('ReminderTime'), '2024-08-08T12:00:00Z');
	fireEvent.press(getByText('Save'));

	await waitFor(() => {
		expect(getByText('Reminder created successfully')).toBeTruthy();
	});
});

test('should submit form unsuccessfully', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI  = render(<CreateReminderScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: false }
	} as AxiosResponse);

	fireEvent.changeText(getByPlaceholderText('Title'), 'New Reminder');
  fireEvent.changeText(getByPlaceholderText('Description'), 'Reminder description');
  fireEvent.changeText(getByPlaceholderText('ReminderTime'), '2024-08-08T12:00:00Z');
	fireEvent.press(getByText('Save'));

	await waitFor(() => {
		expect(getByText('Reminder failed to create')).toBeTruthy();
	});
});