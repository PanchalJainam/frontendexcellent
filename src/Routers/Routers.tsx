import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import { Toaster } from 'react-hot-toast'
import Payment from '../pages/Payment'
import { AuthProvider } from '../context/AuthProvider'

const Routers = () => {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Product />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                </AuthProvider>
                <Toaster />
            </BrowserRouter>
        </div>
    )
}

export default Routers