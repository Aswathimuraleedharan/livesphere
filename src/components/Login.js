import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login } from '../services/AuthServices'; // Import the login service
import { useNavigate } from 'react-router-dom'; // Import useNavigate
//import axiosInstance from 'axios';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    // const { email, password } = data;
    const email = data.email;
    const password = data.password;
    
    // alert(data.email)
    try {
      // const token = login(email, password)
      login(email, password)
      // console.log(token);
      // alert('Login successful');
      // Redirect based on role
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/chat');
      }
    } catch (error) {
      setLoginError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
      {loginError && <Typography color="error">{loginError}</Typography>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
        <TextField label="Email" type="text" variant="outlined" fullWidth required {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: 'Please enter a valid Gmail address' } })} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Password" type="password" variant="outlined" fullWidth required {...register('password', { required: 'Password is required' })} error={!!errors.password} helperText={errors.password?.message} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </Box>
    </Box>
  );
}

export default LoginPage;







