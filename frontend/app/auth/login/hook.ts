"use client";

import { useState } from "react";
import { loginService } from "./service";

export function useLogin(onLoginSuccess: (username: string) => void) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setError("");

    if (!username || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {

      setLoading(true);

      const res = await loginService({
        username,
        password,
      });

      if (res.success) {
        onLoginSuccess(res.user?.username || username);
      } else {
        setError(res.message || "Đăng nhập thất bại");
      }

    } catch (err) {
      setError("Không thể kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    handleSubmit,
  };
}