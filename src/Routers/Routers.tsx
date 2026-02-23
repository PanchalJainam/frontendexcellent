import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Navbar = React.lazy(() => import("../components/Navbar/Navbar"))
const Product = React.lazy(() => import("../pages/Product"))
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Cart = React.lazy(() => import("../pages/Cart"))
const Payment = React.lazy(() => import("../pages/Payment"))
const Loader = React.lazy(() => import("../components/Loader/Loader"))
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthProvider'

const Routers = () => {
    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
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
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default Routers