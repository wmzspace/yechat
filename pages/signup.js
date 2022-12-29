import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  Alert,
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

export default function SignupScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameIsValid, setUserNameValidation] = React.useState(false);
  const [passwordIsValid, setPasswordValidation] = React.useState(false);
  

  const sendAjax = () => {
    
    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    
    fetch('http://192.168.3.23:8085/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data;charset=utf-8',
      },
      body: "key=1",
      // body: formData,
    })
    // .then((response) => response.json())
    // .then((responseData)=> {
    //     console.log('uploadImage', responseData);
    //   resolve(responseData);
    // })
    // .catch((err)=> {
    //     console.log('err', err);
    //     reject(err);
    // });
      .then(function (res) {
        console.log('fetch request ', JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            console.info(json);
            Alert.alert(
              '已完成注册',
              '用户名: ' + json.username + '\n密码: ' + json.password,
              // JSON.stringify(json),
              [{text: '确定', onPress: () => console.log('OK Pressed!')}],
            );
          });
        } else {
          Alert.alert('提示', '请求失败', [
            {text: '确定', onPress: () => console.log('OK Pressed!')},
          ]);
        }
      })
      .catch(function (e) {
        console.log('fetch fail');
        Alert.alert('提示', '系统错误', [
          {text: '确定', onPress: () => console.log('OK Pressed!')},
        ]);
      });
  };

  // const sendAjax = () => {
  //   fetch('http://192.168.3.23:8085', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: 'key=1',
  //   })
  //     .then(function (res) {
  //       console.log('fetch request ', JSON.stringify(res.ok));
  //       if (res.ok) {
  //         res.json().then(function (json) {
  //           console.info(json);
  //           Alert.alert(
  //             '提示',
  //             '来自后台数据：名字' + json.name + '、年龄' + json.age,
  //             [{text: '确定', onPress: () => console.log('OK Pressed!')}],
  //           );
  //         });
  //       } else {
  //         Alert.alert('提示', '请求失败', [
  //           {text: '确定', onPress: () => console.log('OK Pressed!')},
  //         ]);
  //       }
  //     })
  //     .catch(function (e) {
  //       console.log('fetch fail');
  //       Alert.alert('提示', '系统错误', [
  //         {text: '确定', onPress: () => console.log('OK Pressed!')},
  //       ]);
  //     });
  // };

  return (
    <View
      style={[
        styles.container,
        styles.container,
        useColorScheme() === 'dark'
          ? styles.darkBackgroundColor
          : styles.lightBackgroundColor,
      ]}>
      <StatusBarComp />
      <View style={{alignItems: 'center'}}>
        {/* <View style={{alignItems: 'center'}}> */}
        <Text style={{marginTop: 60, marginBottom: 20, fontSize: 20}}>
          易聊账号注册
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
            <MaterialCommunityIcons name="lock" size={30} style={style.icon} />
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
            已有账号？
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              立即登录
            </Text>
          </Text>
        </View>

        <TouchableHighlight
          // onPress={() => navigation.navigate('Home')}
          onPress={sendAjax}
          disabled={!(userNameIsValid && passwordIsValid)}
          style={
            userNameIsValid && passwordIsValid
              ? [styles.button, {backgroundColor: 'blue'}]
              : styles.disabledButton
          }>
          <Text style={{color: '#f5fcfa', fontSize: 16}}>注册</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
