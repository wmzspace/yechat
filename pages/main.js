import * as React from 'react';
import {
  View,Text,
  useColorScheme,
} from 'react-native';
import {StatusBarComp} from '../@components/StatusBarComp';
import styles from '../styles';


export default function MainScreen({navigation}) {

  return (
    <View
      style={[
        styles.innerContainer,
        useColorScheme() === 'dark'
          ? styles.darkBackgroundColor
          : styles.lightBackgroundColor,
          ]}>
        
      <Text>敬请期待</Text>
    </View>
  );
}
