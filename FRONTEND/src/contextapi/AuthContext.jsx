import { useContext, useState, createContext, useEffect } from "react";

const context = createContext()

export const AuthProvider = ({children}) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return sessionStorage.getItem("isAdminLoggedIn") === "true"
    })
    const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
        return sessionStorage.getItem("isCustomerLoggedIn") === "true"
    })
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(() => {
        return sessionStorage.getItem("isSellerLoggedIn") === "true"
    })

    useEffect(() => {
        
        return () => {
            sessionStorage.setItem("isAdminLoggedIn", isAdminLoggedIn)
            sessionStorage.setItem("isCustomerLoggedIn", isCustomerLoggedIn)
            sessionStorage.setItem("isSellerLoggedIn", isSellerLoggedIn)    
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