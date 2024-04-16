import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../styles';
import StyledTextInput from '../../components/Inputs/StyledTextInput';
import StyledButton from '../../components/Buttons/StyledButton';

import {showToast} from '../../utils/common/toaster';
import useQueryHandler from '../../utils/hooks/useQueryHandler';
import {forgotPassword} from '../../http/requests';
import {isEmailValid} from '../../utils/validations';

export default function ForgotPassword({navigation}: any) {
  const [email, setEmail] = useState('');
  const {tryQuery} = useQueryHandler();

  const handleResetPassword = async () => {
    const validationResult = isEmailValid(email);
    if (validationResult !== true) {
      showToast({
        type: 'error',
        text1: 'invalidInputMessage',
        text2: 'Invalid Email',
      });
      return;
    }
    const resetResponse = await tryQuery(
      () => forgotPassword(email),
      'General',
    );
    if (resetResponse) {
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Password reset link sent to your email',
      });
    }
  };

  return (
    <SafeAreaView style={globalStyles.PageContainer}>
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text>Forgot Password Screen</Text>
        </View>
        <View style={styles.section2}>
          <StyledTextInput
            placeholder="Email"
            setValue={setEmail}
            value={email}
            extraProps={{
              keyboardType: 'email-address',
            }}
          />
          <StyledButton onPress={handleResetPassword}>
            <Text>Reset Password</Text>
          </StyledButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  section1: {
    height: 120,
  },
  section2: {
    justifyContent: 'space-evenly',
    height: 500,
  },
});
