import React from 'react';
import { render, fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen'

test('should render profile screen', async () => {
	const { getByPlaceholderText }: RenderAPI = render(<ProfileScreen />);
	expect(getByPlaceholderText('Avatar')).toBeTruthy();
	expect(getByPlaceholderText('First name')).toBeTruthy();
	expect(getByPlaceholderText('Last name')).toBeTruthy();
})

it('should update profile syncronously', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI = render(<ProfileScreen />);

	const firstName = getByPlaceholderText('First name')
	fireEvent.changeText(firstName, 'Lily')

	const lastName = getByPlaceholderText('Last name')
	fireEvent.changeText(lastName, 'May')

	const avatar = getByPlaceholderText('Avatar')
	fireEvent.changeText(avatar, 'example.jpg')

	const saveChanges = getByText('Save')
	fireEvent.press(saveChanges)

	await waitFor(() => {
		expect(firstName.props.value).toBe('Lily');
		expect(lastName.props.value).toBe('May');
		expect(avatar.props.value).toBe('example.jpg');
	})
});