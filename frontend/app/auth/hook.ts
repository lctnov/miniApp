"use client";

import { useState } from "react";
import { ViewType } from "./types";

export function useAuthFlow() {
  const [currentView, setCurrentView] = useState<ViewType>("login");
  const [loggedInUser, setLoggedInUser] = useState("");

  const loginSuccess = (username: string) => {
    setLoggedInUser(username);
    setCurrentView("welcome");
  };

  const registerSuccess = () => {
    setCurrentView("login");
  };

  const logout = () => {
    setLoggedInUser("");
    setCurrentView("login");
  };

  return {
    currentView,
    loggedInUser,
    setCurrentView,
    loginSuccess,
    registerSuccess,
    logout,
  };
}