import React from 'react';
import { Route,Routes,Link } from 'react-router-dom';
import NotFound from '../main/NotFound';
import './styles/SellerNavbar.css'
import SellerHome from './SellerHome';
import MyArtWork from './MyArtWork';
import UploadArtWork from './UploadArtWork';
import HostAnAuction from './HostAnAuction';
import Profile from './Profile';
import MainHome from '../main/MainHome';
import Login from '../authentication/Login'
import { useAuth } from '../contextapi/AuthContext';


const SellerNavbar = () => {
    const {setIsSellerLoggedIn} = useAuth()

    const handleClick = () => {
      setIsSellerLoggedIn(false)
    }
    return (
      <div className='navbar'>
        <div className="nav-links">
          <div className="nav-start-section">
            <Link to="/sellerhome">
              <strong>Asthetica</strong>
            </Link>
          </div>
          <div className="nav-mid-section">
            <Link to="/myartwork">MyArtWork</Link>
            <Link to="/uploadartwork">UploadArtWork</Link>
            <Link to="/hostanauction">HostAnAuction</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login" onClick={handleClick}>Logout</Link>
          </div>
        </div>

        <Routes>
          <Route path="/sellerhome" element={<SellerHome />} />
          <Route path="/myartwork" element={<MyArtWork />} />
          <Route path="/uploadartwork" element={<UploadArtWork />} />
          <Route path="/hostanauction" element={<HostAnAuction />} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
}

export default SellerNavbar;
