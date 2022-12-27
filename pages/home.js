import * as React from 'react';
import {StyleSheet, Text, View, ImageBackground, SafeAreaView,Dimensions,StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBarComp } from '../@components/StatusBarComp';
import styles from '../styles'; 
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginBottom: 23,
    margin: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default function HomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../images/home.jpg')}
      style={[{
        // flex: 1,
        resizeMode: 'cover',
      }, styles.container]}>
      <StatusBarComp />
      {/* <Text style={{color: 'black'}}>11111111</Text> */}
      <Text
        style={{
          color: '#fcfcfc',
          textAlign: 'center',
          flex: 1,
          marginTop: 100,
          fontSize: 40,
          fontFamily: '',
        }}>
        YeChat
      </Text>

      <View style={[styles.inlineFlex, {justifyContent: 'space-between'}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[
            style.button,
            {
              backgroundColor: '#06be5e',
            },
          ]}>
          <Text style={[style.buttonText, {color: '#f5fcfa'}]}>登录</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={[
            style.button,
            {
              backgroundColor: '#fcfcfc',
            },
          ]}>
          <Text style={[style.buttonText, {color: 'black'}]}>注册</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
