import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,useColorScheme
} from 'react-native';
import {StatusBarComp} from '../@components/StatusBarComp';
import styles from '../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 245,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'rgba(171, 190, 215, 0.56)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    width: 200,
    height: 50,
    fontSize: 14,
  },
});

export default function LoginScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameIsValid, setUserNameValidation] = React.useState(false);
  const [passwordIsValid, setPasswordValidation] = React.useState(false);

  return (
    <View style={[styles.container,useColorScheme() === 'dark'
    ? styles.darkBackgroundColor
    : styles.lightBackgroundColor]}>
      <StatusBarComp />
      <View style={{alignItems: 'center'}}>
        {/* <View style={{alignItems: 'center'}}> */}
        <Text style={{marginTop: 60, marginBottom: 20, fontSize: 20}}>
          易聊账号登录
        </Text>
        <View>
          <View style={style.inputWrap}>
            <MaterialCommunityIcons
              name="account"
              size={30}
              style={style.icon}
            /> 
            <TextInput
              style={style.textInput}
              placeholder="用户名"
              clearButtonMode="always"
              selectionColor="skyblue"
              maxLength={19}
              onChangeText={_userName => {
                setUserName(_userName);
                setUserNameValidation(_userName.length >= 6);
                // dispatch({type: 'userName', userName: userName});
              }}
            />
          </View>

          <View style={style.inputWrap}>
            <MaterialCommunityIcons
              name="lock"
              size={30}
              style={style.icon}
            />
            <TextInput
              style={style.textInput}
              placeholder="密码"
              secureTextEntry={true}
              clearButtonMode="always"
              selectionColor="skyblue"
              maxLength={19}
              onChangeText={_password => {
                setPassword(_password);
                setPasswordValidation(_password.length >= 6);
                // dispatch({type: 'password', password: password});
              }}
            />
          </View>
          <Text
            style={{
              alignContent: 'flex-start',
              color: 'red',
              marginBottom: 10,
              display:
                (userNameIsValid && passwordIsValid) ||
                !(userName.length * password.length)
                  ? 'none'
                  : 'flex',
            }}>
            用户名和密码需至少6个字符
          </Text>
          <Text style={{alignContent: 'flex-start'}}>
            没有账号？
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              立即注册
            </Text>
          </Text>
        </View>

        <TouchableHighlight
          onPress={() => navigation.navigate('Home')}
          disabled={!(userNameIsValid && passwordIsValid)}
          style={
            userNameIsValid && passwordIsValid
              ? [styles.button, {backgroundColor: 'blue'}]
              : styles.disabledButton
          }>
          <Text style={[style.buttonText, {color: '#f5fcfa', fontSize: 16}]}>
            登录
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
