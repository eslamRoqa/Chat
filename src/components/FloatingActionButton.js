import {TouchableHighlight, View} from 'react-native';
import {BLACK, RED, WHITE_VIEW_COLOR} from '../values/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default props => (
  <TouchableHighlight onPress={props.onPress} style={props.style}>
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
      <Icon name="account-plus-outline" size={25} color="red" />
    </View>
  </TouchableHighlight>
);
