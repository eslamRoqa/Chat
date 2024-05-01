import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <Text> Home Screen</Text>
      <Button title="Log out" onPress={() => logout()} />
    </View>
  );
};

export default HomeScreen;
