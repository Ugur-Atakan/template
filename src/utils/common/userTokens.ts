import AsyncStorage from '@react-native-async-storage/async-storage';

type UserTokens = {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
};

export const getUserTokens = async (): Promise<UserTokens | null> => {
  try {
    const userTokens = await AsyncStorage.getItem('userTokens');
    if (!userTokens) {
      return null;
    }
    const currentUserTokens = JSON.parse(userTokens);
    return currentUserTokens;
  } catch (error) {
    console.error('An error occurred while reading user tokens ', error);
    return null;
  }
};

export const saveUserTokens = async (tokens: UserTokens) => {
  try {
    const jsonValue = JSON.stringify(tokens);
    await AsyncStorage.setItem('userTokens', jsonValue);
  } catch (error) {
    console.error('An error occurred while saving user tokens ', error);
  }
};

export const removeUserTokens = async () => {
  try {
    await AsyncStorage.removeItem('userTokens');
  } catch (error) {
    console.error('An error occurred while removing user tokens ', error);
  }
};
