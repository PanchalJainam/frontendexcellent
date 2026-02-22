import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const { isAuthenticated, logout } = useAuth();
    const { cart } = useSelector((state) => state.cart)
    const [cartTotal, setCartTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length > 0) {
            const filterData = cart.filter((item) => item.product !== null);
            setCartTotal(filterData?.length);
        } else {
            setCartTotal(0)
        }
    }, [cart])

    const handleLogout = () => {
        logout();
        setCartTotal(0);
        navigate("/login")
    }
    return (
        <div className='flex justify-between items-center text-base  px-5 py-2 border-b border-gray-200'>
            <h2 className='text-xl font-semibold'>Excellent commerce
            </h2>

            <nav>
                <ul className='flex justify-center items-center gap-5 '>
                    <Link to="/">
                        <li className='cursor-pointer'>Home</li>
                    </Link>
                    <Link to="/cart">
                        <li className='cursor-pointer relative'>Cart
                            <div className='absolute w-5 h-5 -top-2 -right-5 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center'>
                                {cartTotal}
                            </div>

                        </li>
                    </Link>
                </ul>
            </nav>
            {
                isAuthenticated ?
                    <div className='felx gap-1.5 text-[#183153] items-center bg-gray-200 rounded px-2'>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <button className='w-fit  px-2 py-2 ' onClick={handleLogout}>
                            Logout
                        </button> </div> : <button className='w-fit bg-gray-200 rounded px-5 py-2'>
                        <Link to="/login">
                            Login
                        </Link>
                    </button>
            }

        </div>
    )
}

export default Navbar