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

const mockNavigation = {
  navigate: jest.fn(),
};

test('should render home screen with elements', async () => {
	const { getByTestId, getByText }: RenderAPI = render(<HomeScreen navigation={mockNavigation} />);

	expect(getByText('+ Reminder')).toBeTruthy();
	expect(getByTestId('reminder-list')).toBeTruthy();
})

test('should handle user input', async () => {
	const { getByText }: RenderAPI  = render(<HomeScreen navigation={mockNavigation} />);

	fireEvent.press(getByText('+ Reminder'));

	await waitFor(() => {
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create Reminder');
	})
});