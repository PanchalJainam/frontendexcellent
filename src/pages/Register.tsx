import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../axios/api';
import toast from 'react-hot-toast';

const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState<string>("")
    const [nameError, setNameError] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")

    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")


    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleRegister = async (e) => {
        e.preventDefault();
        try {

            if (!name) {
                setNameError("Please enter Name")
            } if (!email) {
                setEmailError("Please enter email");
            } else if (!emailValidation.test(email)) {
                setEmailError("Please enter valid email")
                return true;
            } if (!password) {
                setPasswordError("Please enter password");
            }
            if (!confirmPassword) {
                setConfirmPasswordError("Please enter confirm password");
            } else if (password !== confirmPassword) {
                setConfirmPasswordError("Password is not matched")
            }
            else {
                const payload = {
                    name,
                    email,
                    password,
                    confirmPassword
                }
                setLoading(true);
                const res = await registerUser(payload);

                if (res?.data?.success) {
                    toast.success(res?.data?.message)
                    setTimeout(() => {

                        navigate("/login")
                    }, 1000)
                } else {
                    toast.error(res?.data?.message)
                }
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleNameChange = (e) => {
        const val = e.target.value;
        if (!val) {
            setNameError("Please enter name")
        } else {

            setName(e.target.value);
            setNameError("")
        }
    }

    const handleEmailChange = (e) => {
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
        if (!val || val === "" || val === undefined) {
            setPasswordError("Please enter password")
        } else {
            setPassword(e.target.value);
            setPasswordError("")
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const val = e.target.value;
        if (val === "" || val === undefined) {
            setConfirmPasswordError("Please enter confirm password")

        }
        else {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError("")
        }
    }


    return (
        <div>
            <form className='flex flex-col gap-5 p-2 w-96 mx-auto'>
                <h2 className='text-xl font-semibold py-2'>Register</h2>
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="name">Name</label>
                    <input type="name" value={name} name="name" onChange={handleNameChange} className='px-2 py-1 border-2 rounded border-gray-200 ' />
                    {
                        nameError && <span className='text-red-500 text-sm'>{nameError}</span>
                    }
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="email">Email</label>
                    <input className='px-2 py-1 border-2 rounded border-gray-200 ' type="email" value={email} name="email" onChange={handleEmailChange} />
                    {
                        emailError && <span className='text-red-500 text-sm'>{emailError}</span>
                    }

                </div>
                <div className='flex flex-col gap-1.5'>

                    <label htmlFor="password">Password</label>
                    <input className='px-2 py-1 border-2 rounded border-gray-200' type="password" value={password} name="password" onChange={handlePasswordChange} />
                    {
                        passwordError && <span className='text-red-500 text-sm'>{passwordError}</span>
                    }
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className='px-2 py-1 border-2 rounded border-gray-200' type="password" value={confirmPassword} name="confirmPassword" onChange={handleConfirmPasswordChange} />
                    {
                        confirmPasswordError && <span className='text-red-500 text-sm'>{confirmPasswordError}</span>
                    }
                </div>

                <div onClick={handleRegister}>
                    <button className={`px-5 py-2 bg-[#183153] text-white rounded w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}>Register</button>
                </div>


                <div>
                    <span>if you are already register then ? <span onClick={() => navigate("/login")}>Login Here</span></span>
                </div>
            </form>
        </div>
    )
}

export default Register