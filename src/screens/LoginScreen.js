import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from '../values/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeData from '../components/UserDataLocal';
import firestore from '@react-native-firebase/firestore';
import UserIdContext from '../context/userIdContext';

const LoginScreen = ({navigation}) => {
  const contextId = useContext(UserIdContext);
  const [email, onChangeTextEmail] = useState('');
  const [password, onChangeTextPassword] = useState('');

  const [user, setUser] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [logged, setValue] = useState('');

  // const onAuthStateChanged = user => {
  //   setUser(user);
  //   if (initializing) setInitializing(true);
  // };
  // console.log('userObject', user);
  // useEffect(() => {
  //   return auth().onAuthStateChanged(onAuthStateChanged);
  // }, []);

  // useEffect(() => {
  //   console.log('contextIdInLoginScreenUseEffect', contextId);
  //   isLogged();
  // }, []);
  console.log('contextIdInLoginScreen', contextId);
  switch (contextId) {
    case undefined:
      console.log('LoginScreenInSwitch is undefined');
      break;
    case null:
      console.log('LoginScreenInSwitch is null');
      break;
    default:
      navigation.navigate('Home');
  }

  // const isLogged = async () => {
  //   console.log('contextIdInLoginScreenIsLogged', contextId);
  //   const value = await AsyncStorage.getItem('userId');
  //   console.log('userIdFromAsyncStorageInLoginScreen', value);
  //   if (contextId !== undefined) {
  //     navigation.replace('Home');
  //   }
  //   try {
  //     const value = await AsyncStorage.getItem('userId');
  //     console.log('userItem', value);
  //     setValue(value);
  //     if (value !== null) {
  //       return navigation.replace('Home');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const login = () => {
    if (email.length !== 0 && password.length !== 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          navigation.navigate('Home', userCredential);
          storeData('userId', userCredential.user.uid);
        })
        .catch(error => {
          console.log(error.code);
          ToastAndroid.show(error.code, ToastAndroid.LONG);
        });
    } else {
      console.log('Empty value');
      ToastAndroid.show('Please Enter Your Password', ToastAndroid.LONG);
    }
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

        {/* <TouchableHighlight
          style={styles.buttonSecondaryStyle}
          onPress={() => saveFirebase()}>
          <Text>saveFirebase</Text>
        </TouchableHighlight> */}
      </View>
    </View>
  );
};

export default LoginScreen;
