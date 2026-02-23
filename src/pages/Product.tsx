import React, { useEffect, useState } from 'react'
import { addtoCart, cartFetch, productFetch } from "../axios/api.ts"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addCart } from '../redux/slice/cartSlice.ts';
import Loader from '../components/Loader/Loader.tsx';

interface productsType {
    _id: string;
    name: string;
    category: string;
    imageUrl: string;
    stocks: number;
    price: number;
    createdAt: string;
}

const Product = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<productsType[]>([])
    const [allData, setAllData] = useState([])
    const [category, setCategory] = useState([]);
    const [selectedCat, setSelectedCat] = useState("All")
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const fetchProductData = async () => {
        try {
            setLoading(true);
            const res = await productFetch();
            setProduct(res?.data?.data)
            setAllData(res?.data?.data)
            const filterCat = res?.data?.data.map((item) => item.category)
            const uniqueCat = [...new Set(filterCat)]
            const catData = ["All", ...uniqueCat];
            setCategory(catData)
        } catch (error) {
            setLoading(false)
            setProduct([]);
        } finally {
            setLoading(false)
        }
    }

    const handleAddtoCart = async (item) => {
        try {
            if (token) {
                const res = await addtoCart({ id: item })
                if (res?.data?.success) {
                    toast.success(res?.data?.message)
                    fetchCartData();
                } else {
                    toast.error(res?.data?.message)
                }
            } else {
                toast.error("User not login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCartData = async () => {
        try {
            const res = await cartFetch();
            dispatch(addCart(res?.data?.data));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductData();
        if (token) {
            fetchCartData();
        }
    }, [])


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 500);

        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        let filterItem = [...allData];

        if (selectedCat !== "All") {
            setLoading(true);
            filterItem = filterItem.filter((item) => item.category === selectedCat)
        }
        if (debounceSearch) {
            setLoading(true);
            filterItem = filterItem.filter((item) => item.name.toLowerCase().includes(debounceSearch.toLowerCase()))
        }
        setLoading(false)
        setProduct(filterItem)

    }, [allData, selectedCat, debounceSearch, loading])

    return (
        <div className='px-5 py-5'>
            {
                loading ? <Loader /> :
                    <div className='grid md:grid-cols-12 gap-5'>
                        <div className='col-span-2'>

                            <h2 className='font-semibold pb-4'>Category</h2>
                            <div className='flex flex-col gap-2'>
                                {
                                    category && category.map((item) => {
                                        return (
                                            <div className='flex gap-2 items-center cursor-pointer' key={item} onClick={() => setSelectedCat(item)}>
                                                <input type="radio" onChange={(e) => setSelectedCat(e.target.value)} checked={selectedCat === item} value={item} name="category" />
                                                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='md:col-span-10'>
                            <div className='flex gap-2 item-center justify-center w-60 border-2 border-gray-200 rounded mb-5 px-4 py-2'>
                                <div><i className="fa-solid fa-magnifying-glass text-sm"></i></div>
                                <input className='outline-none focus:outline-none text-[#183153] w-full' type="text" name="search" value={search} placeholder='Search products' onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                {
                                    product && product.length > 0 ? product.map((item) => {
                                        return (
                                            <div key={item?._id} className='flex flex-col p-2 gap-2.5 border-2 border-gray-200 rounded'>
                                                <div className='bg-gray-200 rounded-md w-full p-4'>
                                                    <img src={item?.imageUrl} className='w-32 h-32  grid place-content-center place-items-center mx-auto' alt="product_img" />
                                                </div>
                                                <div className='h-20 flex flex-col gap-1.5 text-sm font-medium'>
                                                    <h2>{item?.name}</h2>
                                                </div>
                                                <div className='flex justify-between items-center text-sm font-medium'>
                                                    <span><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{item?.price}</span>
                                                    <button className='py-2 px-5 cursor-pointer w-fit bg-gray-200 rounded' onClick={() => handleAddtoCart(item._id)}>Add to cart</button>
                                                </div>
                                            </div>
                                        )
                                    }) :
                                        <>
                                            <h2>No Data</h2>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Product