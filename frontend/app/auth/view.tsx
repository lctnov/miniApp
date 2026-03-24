"use client";

import { LoginView } from "./login/view";
import { RegisterForm } from "./register/view";
import { ForgotPasswordForm } from "./forgot/page";
import { WelcomeScreen } from "./welcome/page";

import { useAuthFlow } from "./hook";

export function AuthView() {
  const {
    currentView,
    loggedInUser,
    setCurrentView,
    loginSuccess,
    registerSuccess,
    logout,
  } = useAuthFlow();

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

      {currentView === "login" && (
        <LoginView
          onSwitchToRegister={() => setCurrentView("register")}
          onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
          onLoginSuccess={loginSuccess}
        />
      )}

      {currentView === "register" && (
        <RegisterForm
          onSwitchToLogin={() => setCurrentView("login")}
          onRegisterSuccess={registerSuccess}
        />
      )}

      {currentView === "forgot-password" && (
        <ForgotPasswordForm
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}

      {currentView === "welcome" && (
        <WelcomeScreen
          username={loggedInUser}
          onLogout={logout}
        />
      )}

    </div>
  );
}