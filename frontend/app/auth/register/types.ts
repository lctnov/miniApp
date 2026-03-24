export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
	username: string;
  };
}

export interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}