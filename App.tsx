import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createStackNavigator();

const LandingPage = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to Schedulr</Text>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('GetStarted')}
        />
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GetStarted" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
