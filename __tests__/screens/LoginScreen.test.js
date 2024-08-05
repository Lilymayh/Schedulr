import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen'; 

test('should render login form', async () => {
	const { getByPlaceholderText, getByText } = render(<LoginScreen />);

	expect(getByPlaceholderText('Email')).toBeTruthy();
	expect(getByPlaceholderText('Password')).toBeTruthy();
	expect(getByText('Log In')).toBeTruthy();
})

test('should handle user input', async () => {
	const { getByPlaceholderText } = render(<LoginScreen />);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');

	expect(getByPlaceholderText('Email').props.value).toBe('test@email.com');
	expect(getByPlaceholderText('Password').props.value).toBe('password');
})

test('should submit form successfully', async () => {
	const { getByPlaceholderText, getByText } = render(<LoginScreen />);

	fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
	fireEvent.changeText(getByPlaceholderText('Password'), 'password');
	fireEvent.press(getByText('Log In'));

	await waitFor(() => {
		expect(getByText('Login Successful')).toBeTruthy();
	});
});