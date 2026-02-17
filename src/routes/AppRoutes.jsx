import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import AdminPage from '../pages/AdminPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes
