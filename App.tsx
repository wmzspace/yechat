import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";

import styles from "./styles";
import HomeScreen from "./pages/home";
import LoginScreen from "./pages/home";
import SignupScreen from "./pages/home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="欢迎加入易聊" component={HomeScreen} />
          <Stack.Screen name="注册" component={SignupScreen} />
          <Stack.Screen name="登录" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
