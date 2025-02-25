import React from 'react';
import {Routes,Route,Link} from 'react-router-dom'
import NotFound from './NotFound';
import App from '../App';
import Home from '../components/Home';
import './style.css'
import Artists from '../components/Artists';
import Autions from '../components/Autions';
import Search from '../components/Search';
import Wishlist from '../components/Wishlist';
import Profile from '../components/Profile';
import { IoSearchSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/'>Asthetica</Link>
            <Link to='/'>Home</Link>
            <Link to='artists'>Artists</Link>
            <Link to='autions'>Auctions</Link>
            <Link to='search'><IoSearchSharp /></Link>
            <Link to='wishlist'><IoMdHeart /></Link>
            <Link to='profile'><IoPersonSharp/></Link>
            
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/artists' element={<Artists/>}/>
                <Route path='/autions' element={<Autions/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/wishlist' element={<Wishlist/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='*' Component={NotFound}/>
            </Routes>
        </div>
    );
}

export default Navbar;
