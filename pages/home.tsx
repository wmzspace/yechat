import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import styles from '../styles';

function HomeScreen({navigation}) {
  const [text, setText] = useState('');
  return (
    <View style={styles.innerContainer}>
      {/* <TextInput
          style={stylesLogin.input}
          placeholder="Enter your username:"
          onChangeText={_text => setText(_text)}
        /> */}
      <Button title="注册" onPress={() => navigation.navigate('注册')} />
      <Button title="登录" onPress={() => navigation.navigate('登录')} />
    </View>
  );
}

export default HomeScreen;
