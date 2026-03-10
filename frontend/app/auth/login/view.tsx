"use client";

import { Lock, User } from "lucide-react";
import { LoginFormProps } from "./types";
import { useLogin } from "./hook";

export function LoginView({
  onSwitchToRegister,
  onSwitchToForgotPassword,
  onLoginSuccess,
}: LoginFormProps) {

  const {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    submit,
  } = useLogin(onLoginSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

      <h2 className="text-center mb-6 text-xl font-semibold">
        Đăng Nhập
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-2">Tên đăng nhập</label>

          <div className="relative">

            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 border border-gray-300 rounded-lg h-10"
              placeholder="Nhập tên đăng nhập"
            />

          </div>
        </div>

        <div>
          <label className="block mb-2">Mật khẩu</label>

          <div className="relative">

            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 border border-gray-300 rounded-lg h-10"
              placeholder="Nhập mật khẩu"
            />

          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg h-10"
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>

      </form>

      <div className="mt-6 text-center space-y-2">

        <button
          onClick={onSwitchToForgotPassword}
          className="text-blue-600 hover:underline text-sm"
        >
          Quên mật khẩu?
        </button>

        <div className="text-gray-600 text-sm">
          Chưa có tài khoản?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline"
          >
            Đăng ký ngay
          </button>
        </div>

      </div>

    </div>
  );
}