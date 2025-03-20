import React from 'react';
import { Route,Routes,Link } from 'react-router-dom';
import NotFound from './NotFound';
import './styles/SellerNavbar.css'
import Home from '../components/seller/Home';
import MyArtWork from './../components/seller/MyArtWork';
import UploadArtWork from '../components/seller/UploadArtWork';
import HostAnAuction from '../components/seller/HostAnAuction';
import Profile from '../components/seller/Profile';
import ProfileModule from './navcomps/ProfileModule';


const SellerNavbar = () => {
    return (
      <div className='navbar'>
        <div className="nav-links">
          <div className="nav-start-section">
            <Link to="/">
              <strong>Asthetica</strong>
            </Link>
          </div>
          {/* <Link to="/">Home</Link> */}
          <div className="nav-mid-section">
            <Link to="myartwork">MyArtWork</Link>
            <Link to="uploadartwork">UploadArtWork</Link>
            <Link to="hostanauction">HostAnAuction</Link>
            <Link to="profile">Profile</Link>
          </div>
          {/* <div className="nav-end-section">
            <ProfileModule/>
          </div> */}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myartwork" element={<MyArtWork />} />
          <Route path="/uploadartwork" element={<UploadArtWork />} />
          <Route path="/hostanauction" element={<HostAnAuction />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
}

export default SellerNavbar;
