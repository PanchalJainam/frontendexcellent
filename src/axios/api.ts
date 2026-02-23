import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token=localStorage.getItem("token") ;

const axiosHeaders=axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   headers:{
    Authorization:`Bearer ${token}`
   }
})


export const productFetch = () => axiosInstance.get("/product");

export const loginUser=(data)=>axiosInstance.post("/auth/login",data);
export const registerUser=(data)=>axiosInstance.post("/auth/register",data);

export const cartFetch=()=>axiosHeaders.get("/cart");
export const addtoCart=(data)=>axiosHeaders.post("/cart/add",data)
export const updateQauntity=(productId,data)=>axiosHeaders.post(`/cart/update/${productId}`,data)
export const removeProduct=(productId)=>axiosHeaders.post(`/cart/remove/${productId}`)



