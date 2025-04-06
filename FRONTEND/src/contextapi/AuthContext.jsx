import {createContext, useState, useContext, useEffect} from 'react'

const AuthContext = createContext();

import React from 'react';

export function AuthProvider({children}){
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem("isAdminLoggedIn") === "true"
    })
    const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
        return localStorage.getItem("isCustomerLoggedIn") === "true"
    })
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(() => {
        return localStorage.getItem("isSellerLoggedIn") === "true"
    })

    useEffect(() => {
        localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn)
        localStorage.getItem("isCustomerLoggedIn", isCustomerLoggedIn)
        localStorage.getItem("isSellerLoggedIn", isSellerLoggedIn)
    }, [isAdminLoggedIn, isCustomerLoggedIn, isSellerLoggedIn]);

    return (
        <AuthContext.Provider
        value={{
            isAdminLoggedIn,
            setIsAdminLoggedIn,
            isCustomerLoggedIn,
            setIsCustomerLoggedIn,
            isSellerLoggedIn,
            setIsSellerLoggedIn,
        }}
        >
            {children}
        </AuthContext.Provider>  
    )
}

export const useAuth = () => useContext(AuthContext)
