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
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [
  {
    id: 1, //主键是必须有的
    label: '男',
    value: 'male',
  },
  {
    id: 2,
    label: '女',
    value: 'female',
  },
  {
    id: 3,
    label: '?',
    value: null,
    selected: true,
  },
];

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
  const [gender, setGender] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [userNameIsValid, setUserNameValidation] = React.useState(false);
  const [passwordIsValid, setPasswordValidation] = React.useState(false);
  const userInfo = {userName: userName, password: password};

  const [radioButtons, setRadioButtons] = React.useState(radioButtonsData);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    for (let option of radioButtonsArray) {
      if (option.selected) {
        setGender(option.value);
      }
    }
  }

  const sendAjax = () => {
    fetch('http://192.168.3.23:8085/signup', {
      method: 'POST',
      mode: 'cros',
      //same-origin - 同源请求，跨域会报error
      //no-cors - 默认，可以请求其它域的资源，不能访问response内的属性
      //cros - 允许跨域，可以获取第三方数据，必要条件是访问的服务允许跨域访问
      //navigate - 支持导航的模式。该navigate值仅用于HTML导航。导航请求仅在文档之间导航时创建。
      body: `username=${userInfo.userName}&password=${userInfo.password}&gender=${gender}&age=${age}&address=${address}`, // 上传到后端的数据
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data;charset=utf-8', //非文本内容
        // 'Content-Type': 'multipart/form-data;boundary=------FormBoundary15e896376d1'
      },
    })
      .then(res => {
        if (res.ok) {
          //数据解析方式
          res
            //.arrayBuffer() // ArrayBuffer/ArrayBufferView
            // .json() // Json file, need JSON.stringify(...)
            .text()        // String
            //.blob()        // Blob/File
            //.formData()    // FormData
            .then(responseData => {
              //从后端返回的数据(res.end())
              Alert.alert('提示',responseData, [
                { text: '确定', onPress: () => { console.log('OK Pressed!'); if(responseData.substring(0,4)=="注册成功")
                {
                  navigation.navigate('Home');
              }} },
              ]);
            });
        } else {
          Alert.alert('请求失败', 'error', [
            {text: '确定', onPress: () => console.log('OK Pressed!')},
          ]);
        }
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert('请求失败', err, [
          {text: '确定', onPress: () => console.log('OK Pressed!')},
        ]);
        reject(err);
      });
  };

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
              placeholder="用户名*"
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
              placeholder="密码*"
              secureTextEntry={true}
              clearButtonMode="always"
              selectionColor="red"
              maxLength={19}
              onChangeText={_password => {
                setPassword(_password);
                setPasswordValidation(_password.length >= 6);
                // dispatch({type: 'password', password: password});
              }}
            />
          </View>

          <View style={style.inputWrap}>
            <Text>年龄: </Text>
            <TextInput
              style={style.textInput}
              placeholder="(选填)"
              clearButtonMode="always"
              maxLength={2}
              onChangeText={age => {
                setAge(age);
              }}
            />
          </View>
          
          <View style={style.inputWrap}>
            <Text>家乡: </Text>
            <TextInput
              style={style.textInput}
              placeholder="(选填)"
              clearButtonMode="always"
              maxLength={100}
              onChangeText={address => {
                setAddress(address);
              }}
            />
          </View>

          <View style={style.inputWrap}>
            <Text>性别: </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              containerStyle={{width:40}}
              layout="row"
              
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
