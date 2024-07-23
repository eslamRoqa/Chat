import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.error(e);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
export const getUserLogged = async () => {
  try {
    return await AsyncStorage.getItem('userId');
  } catch (e) {
    console.error(e);
  }
};
export default storeData;
