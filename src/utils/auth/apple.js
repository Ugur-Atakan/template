// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
import { Platform } from "react-native";

const appleLoginiOS = async () => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   const appleAuthRequestResponse = await appleAuth.performRequest({
    //     requestedOperation: appleAuth.Operation.LOGIN,
    //     requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    //   });
    //   // get current authentication state for user
    //   const credentialState = await appleAuth.getCredentialStateForUser(
    //     appleAuthRequestResponse.user,
    //   );
    //   // use credentialState response to ensure the user is authenticated
    //   if (credentialState === appleAuth.State.AUTHORIZED) {
    //     // user is authenticated
    //     resolve(appleAuthRequestResponse); // Resolve with Apple's response
    //   } else {
    //     reject('User is not authorized'); // Reject if user is not authorized
    //   }
    // } catch (error) {
    //   reject(error); // Reject with error object
    // }
  });
};

const appleLoginAndroid = async () => {
  return new Promise(async (resolve, reject) => {
    //   try {
    //     // Configure the request
    //     appleAuthAndroid.configure({
    //       responseType: appleAuthAndroid.ResponseType.ALL,
    //       scope: appleAuthAndroid.Scope.ALL,
    //       redirectUri: 'https://service.pokestep.com',
    //     });
    //     // Open the browser window for user sign in
    //     const response = await appleAuthAndroid.signIn();
    //     resolve(response); // Resolve with response on successful sign in
    //   } catch (error) {
    //     reject(error); // Reject with error object
    //   }
  });
};

const signInWithApple = async () => {
  try {
    const response = await (Platform.OS === "ios"
      ? appleLoginiOS()
      : appleLoginAndroid());
    console.log("Apple Sign-In successful:", response);
  } catch (error) {
    console.error("Apple Sign-In failed:", error);
  }
};

export default signInWithApple;
