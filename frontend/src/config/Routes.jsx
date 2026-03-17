import React from 'react'
import { Route, Routes } from 'react-router'
import JoinRoom from '../components/JoinRoom'
import CodeEditor from '../components/CodeEditor'

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<JoinRoom/>}/>
        <Route path='/code' element={<CodeEditor/>}/>
      </Routes>
    </div>
  )
}
