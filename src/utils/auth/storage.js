import AsyncStorage from '@react-native-async-storage/async-storage';

const saveLoginData = async data => {
  try {
    await AsyncStorage.setItem('loginData', JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

const getLoginData = async () => {
  try {
    const value = await AsyncStorage.getItem('loginData');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

const removeLoginData = async () => {
  try {
    await AsyncStorage.removeItem('loginData');
  } catch (e) {
    console.log(e);
  }
};

export {saveLoginData, getLoginData, removeLoginData};
