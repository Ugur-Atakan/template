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
import { saveUserTokens } from "../../utils/common/userTokens";
import { login } from "../../redux/reducers/userReducer";
import { registerWithEmail, registerWithProvider } from "../../http/requests";
import { registerCheck } from "../../utils/validations";
import { signInWithApple, signInWithGoogle } from "../../utils/auth";

export default function Register({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fcm, setFcm] = useState("");
  const { tryQuery } = useQueryHandler();
  const dispatch = useAppDispatch();

  const { updateUserData } = useUserManagement();

  useEffect(() => {
    const getfcm = async () => {
      const fcmId = await getFcmId();
      setFcm(fcmId ?? "");
    };

    getfcm();
  }, [dispatch]);

  const handleRegister = async () => {
    const validationResult = registerCheck({
      email,
      password,
      confirmPassword,
      fullName,
    });
    if (validationResult !== true) {
      showToast({
        type: "error",
        text1: "invalidInputMessage",
        text2: validationResult,
      });
      return;
    }
    const registerResponse = await tryQuery(
      () => registerWithEmail({ email, password, fullName, fcm_id: fcm }),
      "Register"
    );
    if (registerResponse) {
      saveUserTokens(registerResponse.tokens);
      dispatch(login(registerResponse.user));
    }
  };

  const handleLoginWithProvider = async (
    providerName: "google" | "apple",
    signInFunction: any
  ) => {
    const providerResult = await signInFunction();
    const loginResponse = await tryQuery(
      () =>
        registerWithProvider({
          provider: providerName,
          token: providerResult.idToken,
          fcm_id: fcm,
        }),
      "Register"
    );

    if (loginResponse) {
      saveUserTokens(loginResponse.tokens);
      updateUserData();
      dispatch(login(loginResponse.user));
    }
  };

  const handleGoogleRegister = () => {
    handleLoginWithProvider("google", signInWithGoogle);
  };

  const handleAppleRegister = () => {
    handleLoginWithProvider("apple", signInWithApple);
  };

  return (
    <SafeAreaView style={globalStyles.PageContainer}>
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text>Register Screen</Text>
        </View>
        <View style={styles.section2}>
          <StyledTextInput
            placeholder="Full Name"
            setValue={setFullName}
            value={fullName}
            extraProps={{
              keyboardType: "email-address",
            }}
          />

          <StyledTextInput
            placeholder="Email"
            setValue={setEmail}
            value={email}
            extraProps={{
              keyboardType: "email-address",
            }}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            placeholder="Enter your password"
          />
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder="Enter your password again"
          />

          <StyledButton onPress={handleRegister}>
            <Text>Register</Text>
          </StyledButton>
          <View style={[globalStyles.flexRow, styles.buttonsContainer]}>
            <SocialButton
              brand="google"
              extraStyles={styles.socialButtos}
              onPress={handleGoogleRegister}
            >
              Sign up with
            </SocialButton>
            <SocialButton
              brand="apple"
              extraStyles={styles.socialButtos}
              onPress={handleAppleRegister}
            >
              Sign up with
            </SocialButton>
          </View>
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
