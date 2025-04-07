import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import CustomerNavbar from './customer/CustomerNavbar'
import AdminNavbar from "./admin/AdminNavbar";
import SellerNavbar from "./seller/SellerNavbar";
import Footer from "./customer/Footer";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import MainNavbar from "./main/MainNavbar";

function AppContent() {
  const { isAdminLoggedIn, isCustomerLoggedIn, isSellerLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavbar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavbar />
        ) : isSellerLoggedIn ? (
          <SellerNavbar />
        ) : (
          <CustomerNavbar />
        )}
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
