"use client";

import { Lock, User, Mail } from 'lucide-react';
import { useState } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  Box,
  Typography,
  Link,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { RegisterFormProps } from './types';
import { useRegister } from './hook';

export function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const { 
    username, 
    password, 
    confirmPassword, 
    error, 
    loading,
    setUsername, 
    setPassword, 
    setConfirmPassword, 
    handleSubmit 
  } = useRegister(onRegisterSuccess);
  
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Có thể thêm email vào logic xử lý nếu cần
    handleSubmit(e);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: '100%',
        maxWidth: 450,
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          textAlign: 'center',
          mb: 1,
          fontWeight: 600,
        }}
      >
        Đăng Ký Tài Khoản
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        Tạo tài khoản mới để bắt đầu
      </Typography>
      
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        
        {/* Username Field */}
        <TextField
          fullWidth
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên đăng nhập"
          required
          autoComplete="username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <User size={20} style={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={20} style={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          type="password"
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          required
          autoComplete="new-password"
          helperText="Sử dụng ít nhất 8 ký tự"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} style={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          type="password"
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          required
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} style={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Đang đăng ký...
            </Box>
          ) : (
            "Đăng Ký"
          )}
        </Button>
      </Box>

      {/* Switch to Login */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Đã có tài khoản?{' '}
          <Link
            component="button"
            type="button"
            onClick={onSwitchToLogin}
            underline="hover"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Đăng nhập ngay
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}
