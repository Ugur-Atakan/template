import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../styles";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import { SocialButton } from "../../components/Buttons/SocialButton";
import StyledButton from "../../components/Buttons/StyledButton";

import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../utils/common/toaster";
import useQueryHandler from "../../utils/hooks/useQueryHandler";
import { getFcmId } from "../../utils/notification";
import useUserManagement from "../../utils/hooks/useUserManagement";
import { getUserTokens, saveUserTokens } from "../../utils/common/userTokens";
import { login } from "../../redux/reducers/userReducer";
import {
  getUserData,
  loginWithEmail,
  loginWithProvider,
} from "../../http/requests";
import { loginCheck } from "../../utils/validations";
import { signInWithApple, signInWithGoogle } from "../../utils/auth";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcm, setFcm] = useState("");
  const { tryQuery } = useQueryHandler();
  const dispatch = useAppDispatch();

  const { updateUserData } = useUserManagement();

  useEffect(() => {
    const getfcm = async () => {
      const fcmId = await getFcmId();
      setFcm(fcmId ?? "");
    };

    const checkSession = async () => {
      const tokens = await getUserTokens();
      if (tokens) {
        const userData = await getUserData();
        dispatch(login(userData));
      }
    };
    checkSession();
    getfcm();
  }, [dispatch]);

  const fakeLogin = async () => {
    saveUserTokens({
      access: {
        token: "string",
        expires: "string",
      },
      refresh: {
        token: "string",
        expires: "string",
      },
    });

    dispatch(
      login({
        _id: "fakeId",
        fullname: "Name Surname",
        username: "fakeuser",
        email: "fakemail@fakemail.com",
        role: "user",
      })
    );
  };

  const handleLogin = async () => {
    const validationResult = loginCheck({ email, password });
    if (validationResult !== true) {
      showToast({
        type: "error",
        text1: "invalidInputMessage",
        text2: validationResult,
      });
      return;
    }
    const loginResponse = await tryQuery(
      () => loginWithEmail({ email, password }),
      "Login"
    );
    if (loginResponse) {
      saveUserTokens(loginResponse.tokens);
      dispatch(login(loginResponse.user));
    }
  };

  const handleLoginWithProvider = async (
    providerName: "google" | "apple",
    signInFunction: any
  ) => {
    const providerResult = await signInFunction();
    const loginResponse = await tryQuery(
      () =>
        loginWithProvider({
          provider: providerName,
          token: providerResult.idToken,
          fcm_id: fcm ?? "",
        }),
      "Login"
    );

    if (loginResponse) {
      saveUserTokens(loginResponse.tokens);
      updateUserData();
      dispatch(login(loginResponse.user));
    }
  };

  const handleGoogleLogin = () => {
    handleLoginWithProvider("google", signInWithGoogle);
  };

  const handleAppleLogin = () => {
    handleLoginWithProvider("apple", signInWithApple);
  };

  return (
    <SafeAreaView style={globalStyles.PageContainer}>
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text>Login Screen</Text>
        </View>
        <View style={styles.section2}>
          <StyledTextInput
            placeholder="Email"
            setValue={setEmail}
            value={email}
            extraProps={{
              keyboardType: "email-address",
            }}
          />
          <View>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              placeholder="Enter your password"
            />
            <Text
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
              style={styles.forgotPasswordText}
            >
              Forgot your password?
            </Text>
          </View>
          <StyledButton onPress={handleLogin}>
            <Text>Login</Text>
          </StyledButton>
          <StyledButton onPress={fakeLogin}>
            <Text>FakeLogin (Dev. Only)</Text>
          </StyledButton>
          <View style={[globalStyles.flexRow, styles.buttonsContainer]}>
            <SocialButton
              brand="google"
              extraStyles={styles.socialButtos}
              onPress={handleGoogleLogin}
            >
              Sign in with
            </SocialButton>
            <SocialButton
              brand="apple"
              extraStyles={styles.socialButtos}
              onPress={handleAppleLogin}
            >
              Sign in with
            </SocialButton>
          </View>
        </View>
        <View style={styles.section3}>
          <Text
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            Dont have an account? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  section1: {
    height: 120,
  },
  section2: {
    justifyContent: "space-evenly",
    height: 500,
  },
  section3: {
    height: 100,
  },
  forgotPasswordText: {
    textAlign: "right",
  },
  socialButtos: {
    width: 150,
    flexDirection: "row",
  },
  buttonsContainer: {
    gap: 10,
  },
});
