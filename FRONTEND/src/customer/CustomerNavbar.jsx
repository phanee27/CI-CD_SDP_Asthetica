import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NotFound from "../main/NotFound";

import Home from "./CustomerHome";
import Artists from "./Artist";
import Auctions from "./Auctions";
import Search from "./Search";
import Wishlist from "./Wishlist";
import Profile from "./Profile";


import { IoSearchSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

import Login from "../authentication/Login";
import Registration from "../authentication/Registration";

import "./styles/CustomerNavbar.css";
import Discover from "./Discover";

import {useAuth} from '../contextapi/AuthContext'
import { useNavigate } from "react-router-dom";

const CustomerNavbar = () => {
  const {setisCustomerLoggedIn} = useAuth()
  const navigate = useNavigate()
  const handleClick = () => {
    setisCustomerLoggedIn(false)
  }
  return (
    <div className="navbar">
      <div className="nav-links">
        <div className="nav-start-section">
          <Link to="/customerhome">
            <strong>Asthetica</strong>
          </Link>
        </div>
        <div className="nav-mid-section">
          <Link to="discover">Discover</Link>
          <Link to="artists">Artists</Link>
          <Link to="auctions">Auctions</Link>
        </div>
        <div className="nav-end-section">
          <Link to="search">
            <IoSearchSharp />
          </Link>
          <Link to="wishlist">
            <IoMdHeart />
          </Link>
          <Link to="profile">
            <IoPersonSharp />
          </Link>
          <Link to="logout" onClick={handleClick}>
            <button className="btn-login">logout</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/customerhome" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
};

export default CustomerNavbar;
