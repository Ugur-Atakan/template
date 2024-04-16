import {UserInterface} from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  fcm_id?: string;
}

export interface LoginWithProviderCredentials {
  provider: 'google' | 'apple';
  token: string;
  fcm_id: string;
}

export interface RegisterWithProviderCredentials {
  provider: 'google' | 'apple' | 'local';
  token: string;
  fcm_id: string;
}

export interface Tokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export type AuthResponse = {
  tokens: Tokens;
  user: UserInterface;
};
