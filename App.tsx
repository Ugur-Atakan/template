import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Navigator from "./src/navigation";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import LoadingComponent from "./src/components/Loading";
import GlobalModal from "./src/components/Modals/GlobalModal";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { Camera } from "expo-camera";
export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }
  useEffect(() => {
    const checkGoogleServices = async () => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      } catch (err) {
        Alert.alert(
          "Google Play Services are not available",
          "Please install Google Play Services to use the app"
        );
      }
    };
    requestUserPermission();
    checkGoogleServices();
  }, []);
  return (
    <Provider store={store}>
      <Navigator />
      <LoadingComponent />
      <GlobalModal />
      <Toast />
    </Provider>
  );
}
