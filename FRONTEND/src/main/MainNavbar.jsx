import React from 'react';
import {Route, Routes, Link} from 'react-router-dom'
import MainHome from './MainHome'
import MainAbout from './MainAbout';
import './styles/MainNavbar.css'
import { Login } from '../authentication/Login';

const MainNavbar = () => {
    return (
        <div className='mn-navbar'>
            <div className='nav-link-mn-bar' style={{display:'flex', alignItems:'center', gap:'1.5rem'}}>
                <Link to='/home' style={{fontSize:'1.5rem'}}>Asthetica</Link>
                <Link to='/about'>About</Link>
                <Link to='/login'>Login</Link>
            </div>
            <Routes>
                <Route path='/home' element={<MainHome/>}/>
                <Route path='/about' element={<MainAbout/>}/>
                <Route path='/login' element={<Login/>} />
            </Routes>
        </div>
    );
}

export default MainNavbar;
