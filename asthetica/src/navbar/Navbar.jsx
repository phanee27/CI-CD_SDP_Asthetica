import React from 'react';
import {Routes,Route,Link} from 'react-router-dom'
import NotFound from './NotFound';
import App from '../App';
import Home from '../components/Home';

const Navbar = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to=''></Link>
            <Link to=''></Link>
            <Link to=''></Link>
            <Link to=''></Link>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='' element={" "}/>
                <Route path='' element={" "}/>
                <Route path='' element={" "}/>
                <Route path='*' Component={NotFound}/>
            </Routes>
        </div>
    );
}

export default Navbar;
