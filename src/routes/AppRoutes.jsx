import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import AdminPage from '../pages/AdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/admin' element={<AdminPage />} />
    </Routes>
  )
}

export default AppRoutes
