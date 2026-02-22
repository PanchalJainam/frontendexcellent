import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const data = location?.state;
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState();

    const [address, setAddress] = useState();
    const [addressError, setAddressError] = useState();

    const [pinCode, setPinCode] = useState();
    const [pinError, setPinError] = useState();

    const [isModal, setIsModal] = useState(false);

    const numberRegex = /^[0-9]/;

    const handlePaymentModal = (e) => {
        e.preventDefault();
        try {
            if (!name || name.trim() === "") {
                setNameError("Please enter name");
                return true;
            } if (!phone) {
                setPhoneError("Please enter phone")
                return true;

            } else if (!numberRegex.test(phone)) {
                setPhoneError("Please enter digit")
                return true;

            } if (!address || address.trim() === "") {
                setAddressError("Please enter address");
                return true;

            } if (!pinCode) {
                setPinError("Please enter pincode");
                return true;

            } else if (!numberRegex.test(pinCode)) {
                setPinError("Please enter digit")
                return true;

            }
            else {
                setIsModal(true);
                setTimeout(() => {
                    setIsModal(false);
                    navigate("/")
                }, 3000);

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='relative'>
            <div className='px-5 py-5 h-[100vh]'>
                <h2 className='text-[#183153] text-lg font-semibold'>Payment Page</h2>

                <form className='py-5 px-5'>

                    <div className='flex flex-col gap-2.5 w-96 mx-auto'>
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="name" className='text-[#183153] font-medium'>Name</label>
                            <input className='border border-gray-200 rounded py-1 px-2' type="text" name={name} onChange={(e) => { setName(e.target.value); setNameError("") }} />
                            {
                                nameError && <span className='text-red-500 text-sm'>{nameError}</span>
                            }

                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="phone" className='text-[#183153] font-medium'>Phone</label>
                            <input className='border border-gray-200 rounded py-1 px-2' type="text" name={phone} onChange={(e) => { setPhone(e.target.value); setPhoneError("") }} />
                            {
                                phoneError && <span className='text-red-500 text-sm'>{phoneError}</span>
                            }
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="address" className='text-[#183153] font-medium'>Address</label>
                            <input className='border border-gray-200 rounded py-1 px-2' type="text" name={address} onChange={(e) => { setAddress(e.target.value); setAddressError("") }} />
                            {
                                addressError && <span className='text-red-500 text-sm'>{addressError}</span>
                            }
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor="pinCode" className='text-[#183153] font-medium'>Pincode</label>
                            <input className='border border-gray-200 rounded py-1 px-2' type="text" name={pinCode} onChange={(e) => { setPinCode(e.target.value); setPinError("") }} />
                            {
                                pinError && <span className='text-red-500 text-sm'>{pinError}</span>
                            }
                        </div>
                        <div>
                            <button className='px-5 py-2 bg-[#183153] text-white rounded w-full' onClick={handlePaymentModal}>
                                Pay <i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{data?.price}
                            </button>
                        </div>
                    </div>

                </form>
            </div >

            {
                isModal ? <>
                    <div className='fixed inset-0 bg-black/15 w-full flex items-center justify-center z-10' >
                        <div className='flex flex-col gap-5 items-center justify-center p-5 bg-white rounded w-96 mx-auto my-auto'>
                            <div className='w-10 h-10 bg-[#183153] text-white rounded-full flex justify-center items-center'>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <span className='font-semibold text-base'>Your Payment Successfully</span>
                        </div>
                    </div >
                </> : <></>
            }
        </div >
    )
}

export default Payment