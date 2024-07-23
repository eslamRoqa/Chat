import {useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BLACK, GRAY, RED, WHITE} from '../values/colors';
import {useContext, useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserIdContext from '../context/userIdContext';
import uuid from 'react-native-uuid';

const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const userItem = route.params?.item;
  const userId = userItem.userId;
  const currentUserId = useContext(UserIdContext);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  //   navigation.setOptions({
  //     title: `${item.name}`,
  //   });

  const getData = () => {
    console.log(':GetMessage:..');
    console.log(currentUserId);
    console.log(userId);
    console.log(uuid.URL);
    const subscriber = firestore()
      .collection('Chats')
      .orderBy('time')
      // .where({
      //   senderId: currentUserId,
      //   receiverId: currentUserId,
      // })
      // .where('senderId', '==', currentUserId)
      // .where('receiverId', '==', currentUserId)
      .onSnapshot(querySnapshot => {
        console.log('onSnapshotQuerySnapshot:', querySnapshot.size);
        const messages = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('onSnapshotDocumentSnapshot', documentSnapshot.data());
          if (
            documentSnapshot.data().senderId === currentUserId &&
            documentSnapshot.data().receiverId === userId
          ) {
            messages.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          } else if (
            documentSnapshot.data().receiverId === currentUserId &&
            documentSnapshot.data().senderId === userId
          ) {
            messages.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          } else {
            console.log('Chat is empty');
          }
        });

        setChatMessages(messages);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  const time = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  //   const [messages, setMessages] = useState([
  //     {sender: 'John Doe', message: 'Hey there!', time: '6:01 PM'},
  //     {
  //       sender: 'Robert Henry',
  //       message: 'Hello, how are you doing?',
  //       time: '6:02 PM',
  //     },
  //     {
  //       sender: 'John Doe',
  //       message: 'I am good, how about you?',
  //       time: '6:02 PM',
  //     },
  //     {
  //       sender: 'John Doe',
  //       message: `😊😇`,
  //       time: '6:02 PM',
  //     },
  //     {
  //       sender: 'Robert Henry',
  //       message: `Can't wait to meet you.`,
  //       time: '6:03 PM',
  //     },
  //     {
  //       sender: 'John Doe',
  //       message: `That's great, when are you coming?`,
  //       time: '6:03 PM',
  //     },
  //     {
  //       sender: 'Robert Henry',
  //       message: `This weekend.`,
  //       time: '6:03 PM',
  //     },
  //     {
  //       sender: 'Robert Henry',
  //       message: `Around 4 to 6 PM.`,
  //       time: '6:04 PM',
  //     },
  //     {
  //       sender: 'John Doe',
  //       message: `Great, don't forget to bring me some mangoes.`,
  //       time: '6:05 PM',
  //     },
  //     {
  //       sender: 'Robert Henry',
  //       message: `Sure!`,
  //       time: '6:05 PM',
  //     },
  //   ]);

  const sendMessage = () => {
    let t = time(new Date());
    console.log(':SendMessage:..');
    console.log(message);
    console.log(currentUserId);
    console.log(t);
    console.log(userId);
    console.log(uuid.URL);
    //TODO firebase
    firestore()
      .collection('Chats')
      .add({
        message: message,
        senderId: currentUserId,
        time: t,
        receiverId: userId,
        messageId: uuid.URL,
      })
      .then(() => {
        console.log('Message added!');
        setMessage('');
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('messages', chatMessages);
  return (
    <View style={{flex: 1}}>
      <View style={style.chatHeaderStyle}>
        <Image
          style={style.imageProfileStyle}
          source={{uri: userItem.avatar}}
        />
        <Text style={style.titleHeaderStyle}>{userItem.name} </Text>
      </View>
      <FlatList
        // data={JSON.parse(JSON.stringify(messages)).reverse()}
        data={chatMessages.reverse()}
        inverted={true}
        renderItem={({item}) => {
          return (
            <TouchableWithoutFeedback>
              <View style={{marginTop: 6}}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor:
                      item.senderId === currentUserId ? RED : GRAY,
                    alignSelf:
                      item.senderId === currentUserId
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.senderId === currentUserId ? 8 : 0,
                    borderBottomRightRadius:
                      item.senderId === currentUserId ? 0 : 9,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
      <View style={style.messageInputView}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={style.messageInput}
          placeholder="Message"
        />
        <TouchableOpacity
          disabled={!message.length}
          style={style.messageSendView}
          onPress={() => {
            sendMessage();
          }}>
          <Icon name="send" color="red" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  chatHeaderStyle: {
    height: 60,
    shadowOpacity: '#0000',
    backgroundColor: RED,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  imageProfileStyle: {
    height: 50,
    width: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: WHITE,
    marginEnd: 8,
    marginStart: 8,
  },
  titleHeaderStyle: {
    fontSize: 18,
    color: WHITE,
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default ChatScreen;
