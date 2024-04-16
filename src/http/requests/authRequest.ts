import {baseApi} from '..';
import {
  AuthResponse,
  LoginCredentials,
  LoginWithProviderCredentials,
  RegisterCredentials,
  RegisterWithProviderCredentials,
} from '../../types/auth';

const loginWithEmail = async (
  data: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    console.log('data', data);
    const response = await baseApi.post('/auth/login', data);
    console.log('response', response);
    return response.data.result;
  } catch (error: any) {
    throw error;
  }
};

const registerWithEmail = async (
  data: RegisterCredentials,
): Promise<AuthResponse> => {
  try {
    const resposne = await baseApi.post('/auth/register', data);
    return resposne.data.result;
  } catch (error: any) {
    throw error;
  }
};

const registerWithProvider = async (
  data: RegisterWithProviderCredentials,
): Promise<AuthResponse> => {
  try {
    const resposne = await baseApi.post('/auth/register-provider', data);
    return resposne.data.result;
  } catch (error: any) {
    throw error;
  }
};

const loginWithProvider = async (
  data: LoginWithProviderCredentials,
): Promise<AuthResponse> => {
  try {
    const resposne = await baseApi.post('/auth/login-provider', data);
    return resposne.data.result;
  } catch (error: any) {
    throw error;
  }
};

const forgotPassword = async (email: string): Promise<string> => {
  try {
    const resposne = await baseApi.post('/auth/forgot-password', {email});
    return resposne.data.result.code;
  } catch (error: any) {
    throw error;
  }
};

export {
  loginWithEmail,
  registerWithEmail,
  registerWithProvider,
  loginWithProvider,
  forgotPassword,
};
