import React from 'react';
import { render, fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import axios from 'axios';

jest.mock('axios');

//Add mock response
interface AxiosResponse {
  data: {
    success: boolean;
  };
}

test('should render login form', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI = render(<LoginScreen />);

	expect(getByPlaceholderText('Email')).toBeTruthy();
	expect(getByPlaceholderText('Password')).toBeTruthy();
	expect(getByText('Log In')).toBeTruthy();
})

test('should handle user input', async () => {
	const { getByPlaceholderText }: RenderAPI  = render(<LoginScreen />);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');

	expect(getByPlaceholderText('Email').props.value).toBe('test@email.com');
	expect(getByPlaceholderText('Password').props.value).toBe('password');
})

test('should submit form successfully', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI  = render(<LoginScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: true }
	} as AxiosResponse);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');
	fireEvent.press(getByText('Log In'));

	await waitFor(() => {
		expect(getByText('Login Successful')).toBeTruthy();
	});
});

test('should submit form unsuccessfully', async () => {
	const { getByPlaceholderText, getByText } = render(<LoginScreen />);

	(axios.post as jest.Mock).mockResolvedValue({
		data: { success: false }
	} as AxiosResponse);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');
	fireEvent.press(getByText('Log In'));

	await waitFor(() => {
		expect(getByText('Login failed')).toBeTruthy();
	});
});