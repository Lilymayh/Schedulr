import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../screens/SignUpScreen';

test('should render Sign Up form', async () => {
	const { getByText, getText } = render(<SignUpScreen />);
});
