import React from 'react';
import {Route, Routes, Link} from 'react-router-dom'
import MainHome from './MainHome'
import MainAbout from './MainAbout';
import './styles/MainNavbar.css'
import { Login } from '../authentication/Login';
import Registration from '../authentication/Registration';

const MainNavbar = () => {
    return (
        <div className='mn-navbar'>
            <div className='nav-link-mn-bar' style={{display:'flex', alignItems:'center', gap:'1.5rem'}}>
                <Link to='/' style={{fontSize:'1.5rem'}}>Asthetica</Link>
                <Link to='/about'>About</Link>
                <Link to='/login'>Login</Link>
            </div>
            <Routes>
                <Route path='/' element={<MainHome/>}/>
                <Route path='/about' element={<MainAbout/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Registration/>}/>
            </Routes>
        </div>
    );
}

export default MainNavbar;
