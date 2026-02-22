import React, { useEffect, useState } from 'react'
import { cartFetch, removeProduct, updateQauntity } from '../axios/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader/Loader';

interface cartTypes {
    user: string;
    _id: string;

}

const Cart = () => {
    const [cartData, setCartData] = useState<cartTypes[]>([])
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const navigate = useNavigate();
    const [cancelModal, setCancelModal] = useState(false);
    const [productId, setProductId] = useState("")
    const dispatch = useDispatch();


    const fetchCartData = async () => {
        try {
            setLoading(true);
            const res = await cartFetch();
            if (res?.data) {
                const filterData = res?.data?.data.filter((item) => item.product !== null)
                setCartData(filterData)
                dispatch(addCart(res?.data?.data));
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCartData();
    }, [])


    const handleQuantity = async (id: string, type: string) => {
        try {
            const res = await updateQauntity(id, { actionType: type });
            if (res?.data) {
                fetchCartData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct = (id: string) => {
        setProductId(id);
        setCancelModal(true)
    }

    const handleRemoveProduct = async () => {
        try {
            const res = await removeProduct(productId);
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setCancelModal(false);
                fetchCartData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (cartData.length > 0) {
            const totalPrice = cartData.reduce((total, item) => {
                return total + item?.quantity * item?.product?.price;
            }, 0)

            setTotal(totalPrice);
        }
    }, [cartData])

    return (
        <>
            {
                loading ? <Loader /> : <div className='h-screen py-5'>
                    <h2 className='text-[#183153] font-semibold text-lg py-4 border-b px-5 border-gray-200'>Cart page</h2>

                    <div className='flex flex-col gap-2.5 py-2'>
                        {
                            cartData.length === 0 ? <div className='bg-gray-100 mx-5 flex justify-center items-center flex-col gap-1.5 p-10 rounded my-10 shadow h-[40vh]'>
                                <i className="fa-solid fa-cart-arrow-down text-gray-600 text-6xl "></i>
                                <span>Your cart is empty</span>
                            </div> :

                                <div className='flex flex-col gap-2.5 py-5 px-5 max-h-96 overflow-y-auto'>
                                    {
                                        cartData && cartData.length > 0 && cartData.map((item) => {
                                            return (
                                                <div className='grid grid-cols-12 gap-1 lg:gap-5 ' key={item._id}>

                                                    <div className='col-span-4 lg:col-span-2'>
                                                        <img src={item?.product?.imageUrl} alt="alt_image" className='bg-gray-200 w-20 h-20 rounded p-5' />
                                                    </div>

                                                    <div className='col-span-4 lg:col-span-8 gap-1.5'>
                                                        <h2>{item?.product?.name}</h2>
                                                        <span>Price&nbsp;<i className="fa-solid fa-indian-rupee-sign text-sm"></i>&nbsp;{item?.product?.price * item?.quantity}</span>
                                                        <div className='flex gap-2.5'>
                                                            <button className='cursor-pointer border-2 border-gray-200 rounded px-2 ' onClick={() => handleQuantity(item?.product?._id, "dec")}>
                                                                <i className="fa-solid fa-minus text-sm cursor-pointer text-[#183153]"></i>
                                                            </button>
                                                            <span className='w-5 text-center'>{item?.quantity || 1}</span>
                                                            <button className='cursor-pointer border-2 border-gray-200 rounded px-2' onClick={() => handleQuantity(item?.product?._id, "inc")}>
                                                                <i className="fa-solid fa-plus text-sm cursor-pointer text-[#183153]"></i>

                                                            </button>
                                                        </div>

                                                    </div>
                                                    <div className='col-span-4 lg:col-span-2 grid place-content-center'>
                                                        <button className='px-2 py-2 bg-gray-200 rounded w-fit h-fit justify-end' onClick={() => handleProduct(item?.product?._id)}>
                                                            <i className="fa-solid fa-trash-can text-[#183153]"></i>
                                                        </button>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }


                                </div>
                        }
                        <div className='px-5 flex justify-end border-gray-200'>
                            {total && cartData?.length > 0 &&
                                <div className='flex flex-col gap-2 py-5'>
                                    <div className='flex gap-2 items-center'>
                                        <h2>Total</h2>
                                        <span><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{total}</span>
                                    </div>
                                    <div>
                                        <button className='px-5 py-2 bg-[#183153] text-white rounded' onClick={() => { navigate("/payment", { state: { price: total } }) }}>Pay now</button>
                                    </div>
                                </div>}

                        </div>

                        {
                            cancelModal ? <>
                                <div className='fixed inset-0 bg-black/15 w-full flex items-center justify-center z-10'>
                                    <div className='flex flex-col gap-5 items-center justify-center p-5 bg-white rounded-md w-96 h-56'>
                                        <span className='font-semibold text-[18px]'>Are you sure to remove item ?</span>
                                        <div className='flex gap-5 items-center justify-center'>
                                            <button className='w-fit px-3 py-2 border border-[#183153] rounded' onClick={() => setCancelModal(!cancelModal)}>Cancel</button>
                                            <button className='w-fit px-5 py-2 text-white bg-[#183153] rounded' onClick={handleRemoveProduct}>Yes</button>
                                        </div>
                                    </div>

                                </div>
                            </> : <></>
                        }
                    </div>
                </div >
            }
        </>

    )
}

export default Cart