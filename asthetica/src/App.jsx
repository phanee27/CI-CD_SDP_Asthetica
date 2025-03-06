import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import CustomerNavbar from './navbar/CustomerNavbar';
import AdminNavbar from './navbar/AdminNavbar';
import SellerNavbar from './navbar/SellerNavbar';
import Footer from './components/customer/Footer';

function App() {

  return (

    <div>
      <BrowserRouter>
        {/* <AdminNavbar/>
        <SellerNavbar/> */}
        <CustomerNavbar/>
        <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
