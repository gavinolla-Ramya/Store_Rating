import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import StoreDetails from './pages/StoreDetails';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/stores" element={<UserDashboard />} />
          <Route path="/owner" element={<StoreOwnerDashboard />} />
          <Route path="/store/:id" element={<StoreDetails />} />
          <Route path="/owner/stores" element={<StoreOwnerDashboard />} />

        </Routes>
        
      </div>
    </>
  );
};

export default App;
