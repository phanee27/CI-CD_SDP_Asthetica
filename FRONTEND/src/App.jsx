import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import CustomerNavbar from './navbar/CustomerNavbar';
import AdminNavbar from './navbar/AdminNavbar';
import SellerNavbar from './navbar/SellerNavbar';
import Footer from './components/customer/Footer';
import { AuthProvider, useAuth } from "./components/contextapi/AuthContext"
import MainNavbar from './navbar/MainNavbar';

function AppContent(){
  const {isAdminLoggedIn, isCustomerLoggedIn, isSellerLoggedIn} = useAuth()

  return (
    <div>
      <BrowserRouter>
      {isAdminLoggedIn?
      <AdminNavbar/>:
      isCustomerLoggedIn?
      <CustomerNavbar/>:
      isSellerLoggedIn?
      <SellerNavbar/>:
      <CustomerNavbar/>
      }
      </BrowserRouter>
    </div>
  )
}


function App() {

  return (

    <div>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </div>
  )
}

export default App
