import React from 'react';
import {Route, Routes, Link} from 'react-router-dom'
import MainHome from './MainHome'
import MainAbout from './MainAbout';
import './styles/MainNavbar.css'
import { Login } from '../authentication/Login';
import Registration from '../authentication/Registration';
import NotFound from './NotFound';

const MainNavbar = () => {
    return (
        <div className='navbar'>
            <div className='nav-links' >
                <div className='nav-start-section'>
                    <Link to='/' style={{fontSize:'1.5rem'}}>Asthetica</Link>
                </div>
                <div className='nav-mid-section'>
                    <Link to='/about'>About</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<MainHome/>}/>
                <Route path='/about' element={<MainAbout/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Registration/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default MainNavbar;
