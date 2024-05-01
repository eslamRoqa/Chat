import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../values/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, onChangeTextEmail] = useState('');
  const [password, onChangeTextPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        navigation.navigate('Home', userCredential);
      });
  };
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.bottomViewStyle}>
        <Text>Email</Text>

        <View style={styles.inputTextStyle}>
          <Icon style={styles.iconTextInputStyle} name="email" size={20} />
          <TextInput
            value={email}
            onChangeText={onChangeTextEmail}
            placeholder="Enter your email"
          />
        </View>
        <Text>Password</Text>
        <View style={styles.inputTextStyle}>
          <Icon style={styles.iconTextInputStyle} name="lock" size={20} />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={onChangeTextPassword}
          />
        </View>
        <TouchableHighlight
          style={styles.buttonMainStyle}
          onPress={() => login()}>
          <Text>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonSecondaryStyle}
          onPress={() => navigation.navigate('Register')}>
          <Text>SignUp</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LoginScreen;
