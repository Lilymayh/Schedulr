import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../../src/screens/SignUpScreen';
import axios from 'axios';

jest.mock('axios');

test('should render Sing Up form', async () => {
	const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

	expect(getByPlaceholderText('Email')).toBeTruthy();
	expect(getByPlaceholderText('Password')).toBeTruthy();
	expect(getByText('Register')).toBeTruthy();
})

test('should handle user input', async () => {
	const { getByPlaceholderText } = render(<SignUpScreen />);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');

	expect(getByPlaceholderText('Email').props.value).toBe('test@email.com');
	expect(getByPlaceholderText('Password').props.value).toBe('password');
})

test('should submit form successfully', async () => {
	const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

	axios.post.mockResolvedValue({
		data: { success: true }
	});

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');
	fireEvent.press(getByText('Register'));

	await waitFor(() => {
		expect(getByText('Sign up Successful')).toBeTruthy();
	});
});

test('should submit form unsuccessfully', async () => {
	const { getByPlaceholderText, getByText } = render(<SignUpScreen />);

	axios.post.mockResolvedValue({
		data: { success: false }
	});

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');
	fireEvent.press(getByText('Register'));

	await waitFor(() => {
		expect(getByText('Sign up failed')).toBeTruthy();
	});
});