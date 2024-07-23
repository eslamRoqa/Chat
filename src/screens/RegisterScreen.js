import {
  InputAccessoryView,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  TextInputComponent,
  ToastAndroid,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import styles from '../values/styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, onChangeTextName] = useState('');
  const [password, onChangeTextPassword] = useState('');
  const onChangeTextEmail = value => {
    setEmail(value);
  };

  const register = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: name,
          photoURL: 'https://robohash.org/default',
          // photoURL: avatar ? avatar : 'https://robohash.org/default',
        });
        console.log('User account created & signed in!');
        try {
          firestore()
            .collection('Users')
            .doc(user.uid)
            .set({
              userId: user.uid,
              name: name,
              email: email,
              req: [],
              realFriend: [],
              avatar: null,
            })
            .then(() => {
              console.log('User added in firestore!');
            });
        } catch (e) {
          console.error(e);
        }
        navigation.navigate('Login');
        ToastAndroid.show('Congratulations! Login please', ToastAndroid.LONG);
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ToastAndroid.show('That email is already exist!', ToastAndroid.LONG);
          navigation.navigate('Login');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.LONG,
          );
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.bottomViewStyle}>
        <Text style={styles.editTextStyle}>Name</Text>
        <TextInput
          style={styles.inputTextStyle}
          value={name}
          // onChangeText={value => onChangeTextEmail(value)}
          onChangeText={onChangeTextName}
          placeholder="Enter your full name"
        />
        <Text style={styles.editTextStyle}>Email</Text>
        <TextInput
          style={styles.inputTextStyle}
          value={email}
          onChangeText={onChangeTextEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <Text style={styles.editTextStyle}>Password</Text>
        <TextInput
          style={styles.inputTextStyle}
          value={password}
          onChangeText={onChangeTextPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <TouchableHighlight
          style={styles.buttonMainStyle}
          onPress={() => register()}>
          <Text> Submit </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonSecondaryStyle}
          onPress={() => navigation.navigate('Login')}>
          <Text> Cancel </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default RegistrationScreen;
