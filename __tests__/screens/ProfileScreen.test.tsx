import React from 'react';
import { render, fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen'
import axios from 'axios';
import { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;


//Add mock response
interface AxiosResponse {
  data: {
    success: boolean;
  };
}

test('should render profile screen', async () => {
	const { getByPlaceholderText }: RenderAPI = render(<ProfileScreen />);
	expect(getByPlaceholderText('Avatar')).toBeTruthy();
	expect(getByPlaceholderText('First Name')).toBeTruthy();
	expect(getByPlaceholderText('Last Name')).toBeTruthy();
})

it('should update profile syncronously', async () => {
	const { getByPlaceholderText, getByText }: RenderAPI = render(<ProfileScreen />);

	const firstName = getByPlaceholderText('First Name')
	fireEvent.changeText(firstName, 'Lily')

	const lastName = getByPlaceholderText('Last Name')
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