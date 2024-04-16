import Toast from 'react-native-toast-message';

interface IToast {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
}

export const showToast = (data: IToast) => {
  Toast.show({
    type: data.type,
    text1: data.text1,
    text2: data.text2,
  });
};
