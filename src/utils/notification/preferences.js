import AsyncStorage from '@react-native-async-storage/async-storage';

const saveNotificationPreferences = async ({notify, vibrate, sound}) => {
  // If there is no previous preference or it cannot be parsed, we assign an object with the default values being true.
  const currentPrefs = await AsyncStorage.getItem('notifyPreferences');
  const parsedPrefs =
    currentPrefs != null
      ? JSON.parse(currentPrefs)
      : {notificationEnabled: true, vibrateEnabled: true, soundEnabled: true};

  const newPrefs = {
    notificationEnabled: notify ?? parsedPrefs.notificationEnabled,
    vibrateEnabled: vibrate ?? parsedPrefs.vibrateEnabled,
    soundEnabled: sound ?? parsedPrefs.soundEnabled,
  };
  const notifyPrefs = JSON.stringify(newPrefs);
  await AsyncStorage.setItem('notifyPreferences', notifyPrefs);
};

const getNotificationPreferences = async () => {
  try {
    const notifyPrefs = await AsyncStorage.getItem('notifyPreferences');
    if (!notifyPrefs) {
      return {
        notificationEnabled: true,
        vibrateEnabled: true,
        soundEnabled: true,
      };
    }
    return JSON.parse(notifyPrefs);
  } catch (error) {
    console.error('An error occurred while reading user preferences', error);
    return {
      notificationEnabled: true,
      vibrateEnabled: true,
      soundEnabled: true,
    };
  }
};

export {getNotificationPreferences, saveNotificationPreferences};
