import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './paths/register/register.tsx'
import Payments from './paths/payments/payments.tsx'
import Login from './paths/login/login.tsx'
import Dashboard from './paths/dashboard/dashboard.tsx'
import Account from './paths/account/account.tsx'
import Transactions from './paths/transactions/transactions.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/transactions" element={<Transactions />} /> 
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
