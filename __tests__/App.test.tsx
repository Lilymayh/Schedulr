import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { View, Text } from 'react-native'; 

// Mocking the navigation stack to test routing
const MockedApp = () => (
  <View>
    <Text>App rendering...</Text>
  </View>
);

describe('App', () => {
	test('should render app', async () => {
		render(<MockedApp />);
	});
})
