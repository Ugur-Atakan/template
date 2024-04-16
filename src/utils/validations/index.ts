interface LoginCheck {
  email: string;
  password: string;
}
interface RegisterCheck {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}
interface PasswordValidationResponse {
  status: boolean;
  response?: string;
}
export const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

export const isEmailValid = (email: string) => {
  return emailRegEx.test(email);
};

export const isCodeValid = (code: string) => {
  return code.trim().length === 6;
};

export const isPasswordValid = (
  password: string,
): PasswordValidationResponse => {
  if (password.length < 8) {
    return {
      status: false,
      response: 'Password must be at least 8 characters long.',
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      status: false,
      response: 'Password must contain at least one uppercase letter.',
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      status: false,
      response: 'Password must contain at least one lowercase letter.',
    };
  }
  if (!/\d/.test(password)) {
    return {
      status: false,
      response: 'Password must contain at least one number.',
    };
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return {
      status: false,
      response: 'Password must contain at least one special character',
    };
  }
  return {status: true};
};

export const loginCheck = (data: LoginCheck) => {
  if (!isEmailValid(data.email)) {
    return 'invalidEmail';
  }
  if (isPasswordValid(data.password).status !== true) {
    return isPasswordValid(data.password).response;
  }
  return true;
};

export const registerCheck = (data: RegisterCheck) => {
  if (!isEmailValid(data.email)) {
    return 'invalidEmail';
  }
  if (isPasswordValid(data.password).status !== true) {
    return isPasswordValid(data.password).response;
  }
  if (data.password !== data.confirmPassword) {
    return 'passwordNotMatch';
  }
  if (!data.fullName) {
    return 'fullNameRequired';
  }
  return true;
};
