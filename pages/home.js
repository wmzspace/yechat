import * as React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StatusBarComp} from '../@components/StatusBarComp';
import * as Animatable from 'react-native-animatable';
import styles from '../styles';

export default function HomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../images/home.jpg')}
      style={[
        {
          resizeMode: 'cover',
        },
        styles.container,
      ]}>
      <StatusBarComp isDarkStyle="true" />
      <Animatable.View animation="fadeIn" style={{flex: 1}} delay={500}>
        <Text
          style={{
            color: '#fcfcfc',
            textAlign: 'center',
            marginTop: 100,
            fontSize: 45,
            flex: 1,
            fontFamily: '',
          }}>
          YeChat
        </Text>

        <Animatable.View
          style={[styles.inlineFlex, {justifyContent: 'space-between'}]}
          animation="fadeInUp"
          delay={2000}
          duration={1000}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              styles.button2,
              {
                backgroundColor: '#06be5e',
              },
            ]}>
            <Text style={{color: '#f5fcfa', fontSize: 16}}>登录</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.button2,
              {
                backgroundColor: '#fcfcfc',
              },
            ]}>
            <Text style={{color: 'black', fontSize: 16}}>注册</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </ImageBackground>
  );
}
