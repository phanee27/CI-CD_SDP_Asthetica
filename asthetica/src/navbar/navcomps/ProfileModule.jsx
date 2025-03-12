import React from 'react';
import { IoCartOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import '../styles/ProfileModule.css'

const ProfileModule = () => {
    return (
        <div className='nav-end-module'>
            <IoCartOutline/>
            <FaUserCircle/>
            <FaHeart/>
            <button className='logout'>Logout</button>
        </div>
    );
}

export default ProfileModule;
