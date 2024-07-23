import * as colors from '../values/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.RED,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  bottomViewStyle: {
    backgroundColor: colors.WHITE_VIEW_COLOR,
    width: '90%',
    height: '70%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    paddingTop: 28,
  },
  editTextStyle: {},
  inputTextStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: colors.RED,
    borderBlockColor: colors.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMainStyle: {
    backgroundColor: colors.RED,
    padding: 8,
    width: 190,
    marginTop: 24,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonSecondaryStyle: {
    borderColor: colors.BLACK,
    padding: 8,
    width: 190,
    marginTop: 24,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconTextInputStyle: {
    marginStart: 8,
    marginEnd: 8,
  },
  floatingActionButtonStyle: {
    bottom: 45,
    end: 30,
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 45,
    backgroundColor: 'white',
  },
});

export default styles;
