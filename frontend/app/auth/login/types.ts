export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    username: string;
  };
}

export interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  onLoginSuccess: (username: string) => void;
}