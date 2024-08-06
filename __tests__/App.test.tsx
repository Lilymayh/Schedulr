import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native'; 

const Stack = createStackNavigator();

// Mocking the navigation stack to test routing
const MockedApp = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={() => <Text>Landing Page</Text>} />
      <Stack.Screen name="Login" component={() => <Text>Login Page</Text>} />
      <Stack.Screen name="GetStarted" component={() => <Text>Sign Up Page</Text>} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('App', () => {
	test('should render app', async () => {
		const { getByPlaceholderText, getByText }: RenderAPI = render(<MockedApp />);
	});
})
