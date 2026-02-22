import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../redux/slice/cartSlice';

interface AuthContextType {
    isAuthenticated: boolean,
    login: (token: string) => void;
    logout: () => void
}

const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        dispatch(addCart([]))
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        navigate("/");
    }

    return (
        <div>
            <authContext.Provider value={{ isAuthenticated, login, logout }}>
                {children}
            </authContext.Provider>
        </div>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}