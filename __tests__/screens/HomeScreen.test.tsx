import React from 'react';
import { render, fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import axios from 'axios';

jest.mock('axios');

//Add mock response
interface AxiosResponse {
  data: {
    success: boolean;
		reminder?: { id: number, text: string }[];
  };
}

test('should render home screen with elements', async () => {
	const { getByTestId, getByText }: RenderAPI = render(<HomeScreen />);

	expect(getByText('+ Reminder')).toBeTruthy();
	expect(getByTestId('reminder-list')).toBeTruthy();
})

test('should handle user input', async () => {
	const { getByText, getByTestId }: RenderAPI  = render(<HomeScreen />);

	fireEvent.press(getByText('+ Reminder'));

	await waitFor(() => {
		expect(getByTestId('reminder-form')).toBeTruthy();
	})
})

test('should submit form successfully', async () => {
	const { getByTestId, getByText }: RenderAPI  = render(<HomeScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: true, reminder: [{id: 1, text: "New Reminder" }] }
	} as AxiosResponse);

	fireEvent.press(getByText('+ Reminder'));
	fireEvent.changeText(getByTestId('reminder-input'), 'New Reminder');
	fireEvent.press(getByText('Save'));

	await waitFor(() => {
		expect(getByText('New Reminder')).toBeTruthy();
	});
});

test('should submit form unsuccessfully', async () => {
	const { getByTestId, getByText }: RenderAPI  = render(<HomeScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: false }
	} as AxiosResponse);

	fireEvent.press(getByText('+ Reminder'));
	fireEvent.changeText(getByTestId('reminder-input'), 'New Reminder');
	fireEvent.press(getByText('Save'));

	await waitFor(() => {
		expect(getByText('Reminder failed to create')).toBeTruthy();
	});
});