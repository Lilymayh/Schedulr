import React from 'react';
import { render, fireEvent, waitFor, RenderAPI} from '@testing-library/react-native';
import SignUpScreen from '../../src/screens/SignUpScreen';
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

describe('SignUpScreen', () => {
	beforeEach(() => {
    // Reset any state or mocks before each test
    mockedAxios.post.mockReset();
  });


	test('should render Sing Up form', async () => {
		const { getByPlaceholderText, getByText }: RenderAPI = render(<SignUpScreen />);

		expect(getByPlaceholderText('Email')).toBeTruthy();
		expect(getByPlaceholderText('Password')).toBeTruthy();
		expect(getByText('Register')).toBeTruthy();
	});

	test('should handle user input', async () => {
		const { getByPlaceholderText }: RenderAPI = render(<SignUpScreen />);

		fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
		fireEvent.changeText(getByPlaceholderText('Password'), 'password');

		expect(getByPlaceholderText('Email').props.value).toBe('test@email.com');
		expect(getByPlaceholderText('Password').props.value).toBe('password');
	});

	test('should submit form successfully', async () => {
		const { getByPlaceholderText, getByText }: RenderAPI = render(<SignUpScreen />);

		(axios.post as jest.Mock).mockResolvedValue({
			data: { success: true }
		} as AxiosResponse);

		fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
		fireEvent.changeText(getByPlaceholderText('Password'), 'password');
		fireEvent.press(getByText('Register'));

		await waitFor(() => {
			expect(getByText('Sign up Successful')).toBeTruthy();
		});
	});

	test('should submit form unsuccessfully', async () => {
		const { getByPlaceholderText, getByText }: RenderAPI = render(<SignUpScreen />);

		(axios.post as jest.Mock).mockResolvedValue({
			data: { success: false }
		} as AxiosResponse);

		fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
		fireEvent.changeText(getByPlaceholderText('Password'), 'password');
		fireEvent.press(getByText('Register'));

		await waitFor(() => {
			expect(getByText('Sign up failed')).toBeTruthy();
		});
	});
});