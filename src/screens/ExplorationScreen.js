import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import styles from '../values/styles';
import {BLACK, RED, WHITE} from '../values/colors';
import UserIdContext from '../context/userIdContext';
import FloatingActionButton from '../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ExplorationScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const contextUserId = useContext(UserIdContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('contextUserID', contextUserId);

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
  return (
    <View style={style.backgroundColor}>
      {loading ? (
        <ActivityIndicator color={WHITE} />
      ) : (
        <FlatList
          style={style.viewStyle}
          data={users}
          keyExtractor={item => item.userId}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Chat', {item: item})}>
                <View style={style.viewItemStyle}>
                  <Image
                    source={{
                      uri:
                        item.avatar != null
                          ? item.avatar
                          : 'https://picsum.photos/200/300',
                    }}
                    style={style.imageStyle}
                  />
                  <View style={style.item}>
                    <Text style={style.textItemStyle}>{item.name}</Text>
                    <Text>You may know each other</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('Room');
        }}
        style={styles.floatingActionButtonStyle}>
        <View
          style={{
            width: 40,
            height: 40,
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="account-group-outline" size={25} color="red" />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  item: {
    flexGrow: 1,
  },
  viewItemStyle: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: WHITE,
    marginEnd: 8,
    transform: [{scale: 1}],
  },
  backgroundColor: {
    backgroundColor: RED,
    flex: 1,
  },
  textItemStyle: {
    color: BLACK,
    fontSize: 18,
  },
});

export default ExplorationScreen;
