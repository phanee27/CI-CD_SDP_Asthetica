import React from 'react';
import {Routes,Route,Link} from 'react-router-dom'
import NotFound from './NotFound';
import App from '../App';

import Home from '../components/customer/Home';
import Artists from '../components/customer/Artists';
import Autions from '../components/customer/Autions';
import Search from '../components/customer/Search';
import Wishlist from '../components/customer/Wishlist';
import Profile from '../components/customer/Profile';

import { IoSearchSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

import Login from '../underdev/Login';

import './styles/CustomerNavbar.css'
<<<<<<< HEAD
import Discover from './../components/customer/Discover';
=======
import Registration from '../underdev/Registration';
>>>>>>> f90ccb92f98fb220bf1bb32af8d450fd22337850



const CustomerNavbar = () => {
    return (
        <div className='navbar'>
            <div className='nav-links'>
                <div className='nav-start-section'>
                    <Link to='/'><strong>Asthetica</strong></Link>
                </div>
                <div className='nav-mid-section'>
                    <Link to='/'>Home</Link>
                    <Link to='discover'>Discover</Link>
                    <Link to='artists'>Artists</Link>
                    <Link to='autions'>Auctions</Link>
                </div>
                <div className='nav-end-section'>
                    <Link to='search'><IoSearchSharp /></Link>
                    <Link to='wishlist'><IoMdHeart /></Link>
                    <Link to='profile'><IoPersonSharp/></Link>
                    <Link to='login'><button className='btn-login'>Login</button></Link>
                </div>
            </div>
            

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/discover' element={<Discover/>}/>
                <Route path='/artists' element={<Artists/>}/>
                <Route path='/autions' element={<Autions/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/wishlist' element={<Wishlist/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Registration/>} />
                <Route path='*' Component={NotFound}/>
            </Routes>
        </div>
    );
}

export default CustomerNavbar;
