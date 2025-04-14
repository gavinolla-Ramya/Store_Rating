import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      

      const { token, user } = response.data;
      console.log("Login response user:", user);
      

      localStorage.setItem('token', token);
      setUser(user);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'store_owner') {
        navigate('/owner/stores');
      } else {
        navigate('/stores');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
