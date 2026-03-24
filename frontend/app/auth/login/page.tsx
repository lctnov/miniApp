"use client";

import { LoginView } from "./view";

export default function LoginPage() {

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={switchRegister}
        onSwitchToForgotPassword={switchForgot}
      />
    </div>
   
  );
}