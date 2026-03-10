"use client";

import { LoginView } from "./view";

export default function Page() {

  const handleLoginSuccess = (username: string) => {
    console.log("Login success:", username);
  };

  const switchRegister = () => {
    console.log("Switch to register");
  };

  const switchForgot = () => {
    console.log("Switch to forgot password");
  };

  return (
    <LoginView
      onLoginSuccess={handleLoginSuccess}
      onSwitchToRegister={switchRegister}
      onSwitchToForgotPassword={switchForgot}
    />
  );
}