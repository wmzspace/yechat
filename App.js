import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';

import HomeScreen from './pages/home';
import SignupScreen from './pages/signup';
import LoginScreen from './pages/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // title:<>易聊 <Icon name="message1" size={25} color="skyblue"/></>,
            // headerStyle: {
            //   backgroundColor: 'black',
            // },
            // headerTintColor: '#ffffff',
            // headerTitleStyle: {
            //   fontSize: 25,
            //   lineHeight: 30,
            //   borderColor: 'black',
            //   padding: 10,
            // },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: '注册账号',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '登陆账号',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
