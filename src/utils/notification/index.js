import messaging from '@react-native-firebase/messaging';

export const requestFirebasePermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const getFcmId = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.log(error);
  }
};


export const onTokenRefreshListener = () => {
  messaging().onTokenRefresh(token => {
    console.log('A new FCM token refreshed with token:', token);
  });
};
