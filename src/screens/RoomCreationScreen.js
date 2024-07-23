import {useEffect, useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import UserIdContext from '../context/userIdContext';
import firestore from '@react-native-firebase/firestore';
import {RED, WHITE} from '../values/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RoomCreationScreen = () => {
  const contextUserId = useContext(UserIdContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isChecked, setSelection] = useState(false);
  const [members, setMembers] = useState([]);
  const _members = [];

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .where('userId', '!=', contextUserId)
      .onSnapshot(querySnapshot => {
        console.log('querySnapshot', querySnapshot.size);
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('documentSnapshot', documentSnapshot.data());
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const addInFriendsList = id => {
    _members.push(id);
  };
  const removeFromFriendsList = id => {};
  // console.log(isChecked);
  console.log(_members);

  const log = (isChecked, {item}) => {
    console.log(isChecked);
    if (isChecked) {
      addInFriendsList(item.userId);
      console.log(_members);
    } else if (!isChecked) {
      removeFromFriendsList(item.userId);
      console.log(_members);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return (
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                text={item.name}
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                onPress={check => {
                  log(check, {item});
                }}
                textStyle={styles.textStyle}
                style={{marginTop: 16}}
                iconImageStyle={styles.iconImageStyle}
                fillColor={RED}
                unFillColor={'transparent'}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateContainer: {
    height: 45,
    width: 175,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },
  stateTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  syntheticButton: {
    height: 50,
    marginTop: 64,
    borderRadius: 12,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C0EE',
  },
  iconImageStyle: {
    width: 20,
    height: 20,
  },
  textStyle: {
    color: '#010101',
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});

export default RoomCreationScreen;
