import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../axios/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")

    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")


    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            if (!email) {
                setEmailError("Please enter email");
            } else if (!emailValidation.test(email)) {
                setEmailError("Please enter valid email")
                return true;
            }
            if (!password) {
                setPasswordError("Please enter password");
            }
            else {
                const payload = {
                    email,
                    password,
                }
                setLoading(true)
                const res = await loginUser(payload);
                if (res?.data?.success) {
                    login(JSON.parse(JSON.stringify(res?.data?.token)))
                    localStorage.setItem("auth", JSON.stringify(res?.data?.data))
                    toast.success(res?.data?.message)
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                } else {
                    toast.error(res?.data?.message)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleEmaiChange = (e) => {
        const val = e.target.value;
        if (!val) {
            setEmailError("Please enter email")
        } else {
            setEmail(e.target.value);
            setEmailError("")
        }
    }
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        if (!val) {
            setPasswordError("Please enter password")
        } else {
            setPassword(e.target.value);
            setPasswordError("")
        }
    }


    return (
        <div>
            <form className='flex flex-col gap-5 p-2 w-96 mx-auto'>
                <h2 className='text-xl font-semibold py-2'>Login</h2>

                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="email">Email</label>
                    <input autoComplete='off' className='px-2 py-1 border-2 rounded border-gray-200 ' type="email" value={email} name="email" onChange={handleEmaiChange} />
                    {
                        emailError && <span className='text-red-500 text-sm'>{emailError}</span>
                    }

                </div>
                <div className='flex flex-col gap-1.5'>

                    <label htmlFor="password">Password</label>
                    <input autoComplete='off' className='px-2 py-1 border-2 rounded border-gray-200 ' type="password" value={password} name="password" onChange={handlePasswordChange} />
                    {
                        passwordError && <span className='text-red-500 text-sm'>{passwordError}</span>
                    }
                </div>



                <div className='cursor-pointer' onClick={handleLogin}>
                    <button className={`px-5 py-2 bg-[#183153] text-white rounded w-full ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>{loading ? "Logging in.." : "Login"}</button>
                </div>


                <div>
                    <span>if you are not register then ? <span onClick={() => navigate("/register")}>Register Here</span></span>
                </div>
            </form >
        </div >
    )
}

export default Login