import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { showToast } from "../common/toaster";

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.log("google error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Sign in cancelled",
      });
    } else if (error.code === statusCodes.IN_PROGRESS) {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Sign in in progress",
      });
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      showToast({
        type: "error",
        text1: "Error",
        text2: "Play services not available",
      });
    } else {
      showToast({
        type: "error",
        text1: "Google Singin error ",
        text2: error.message,
      });
    }
    throw error;
  }
};

export default signInWithGoogle;
