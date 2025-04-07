import { useContext, useState, createContext, useEffect } from "react";

const context = createContext()

export const AuthProvider = ({children}) => {
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
        
        return () => {
            localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn)
            localStorage.setItem("isCustomerLoggedIn", isCustomerLoggedIn)
            localStorage.setItem("isSellerLoggedIn", isSellerLoggedIn)    
        };
    }, [isAdminLoggedIn, isSellerLoggedIn, isCustomerLoggedIn]);

    return (
        <context.Provider value={{
            isAdminLoggedIn,
            setIsAdminLoggedIn,
            isCustomerLoggedIn,
            setIsCustomerLoggedIn,
            isSellerLoggedIn,
            setIsSellerLoggedIn
        }}
        >
            {children}
        </context.Provider>
    )
}

export const useAuth = () => useContext(context)