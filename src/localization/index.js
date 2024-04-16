import {getLocales} from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRegion = () => {
  const locales = getLocales();
  return locales[0].countryCode;
};

export const getDefaultLanguage = () => {
  const locales = getLocales();
  return locales[0].languageCode;
};

export const saveLanguage = async language => {
  await AsyncStorage.setItem('language', language);
};

export const getLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  return language;
};
