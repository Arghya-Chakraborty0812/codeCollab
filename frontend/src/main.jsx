import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.jsx'
import AppRoutes from './config/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>
)
