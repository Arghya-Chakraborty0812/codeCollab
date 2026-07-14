import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import JoinRoom from '../components/JoinRoom'
import CodeEditor from '../components/CodeEditor'
import Login from '../components/Login'
import Register from '../components/Register'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<ProtectedRoute><JoinRoom/></ProtectedRoute>}/>
        <Route path='/code' element={<ProtectedRoute><CodeEditor/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}