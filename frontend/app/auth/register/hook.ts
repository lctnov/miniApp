"use client";

import { useState } from "react";

export function useRegister(onRegisterSuccess: () => void) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		if (!username || !password || !confirmPassword) {
			setError('Vui lòng điền đầy đủ thông tin');
			return;
		}

		if (username.length < 3) {
			setError('Tên đăng nhập phải có ít nhất 3 ký tự');
			return;
		}

		if (password.length < 6) {
			setError('Mật khẩu phải có ít nhất 6 ký tự');
			return;
		}

		if (password !== confirmPassword) {
			setError('Mật khẩu xác nhận không khớp');
			return;
		}

		// Lấy danh sách user từ localStorage
		const users = JSON.parse(localStorage.getItem('users') || '[]');
		
		// Kiểm tra username đã tồn tại chưa
		if (users.some((u: any) => u.username === username)) {
			setError('Tên đăng nhập đã tồn tại');
			return;
		}

		// Thêm user mới
		users.push({ username, password });
		localStorage.setItem('users', JSON.stringify(users));

		onRegisterSuccess();
	};

	return {
		username,
		password,
		confirmPassword,
		error,
		loading,
		setUsername,
		setPassword,
		setConfirmPassword,
		handleSubmit,
	};
}