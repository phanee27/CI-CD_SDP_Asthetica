import React from 'react';
import { Route,Routes,Link } from 'react-router-dom';
import NotFound from './NotFound';
import './styles/AdminNavbar.css'
import DashBoard from './../components/admin/DashBoard';
import ManageUsers from './../components/admin/ManageUsers';
import ManageArtWorks from './../components/admin/ManageArtWorks';
import Transactions from './../components/admin/Transactions';
import ReportsAnalytics from '../components/admin/ReportsAnalytics';



const AdminNavbar = () => {
    return (
      <div className="navbar">
        <div className="nav-links">
          <div className="nav-start-section">
            <Link to="/admin-dashboard">
              <strong>Asthetica</strong>
            </Link>
          </div>
          <div className="nav-mid-section">
            <Link to="admin-dashboard">DashBoard</Link>
            <Link to="manage-users">ManageUsers</Link>
            <Link to="manage-artworks">ManageArtWorks</Link>
            <Link to="reports-analytics">ReportsAnalytics</Link>
            <Link to="transcations">Transactions</Link>
          </div>
        </div>

        <Routes>
          <Route path="/admin-dashboard" element={<DashBoard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-artworks" element={<ManageArtWorks />} />
          <Route path="/reports-analytics" element={<ReportsAnalytics />} />
          <Route path="/transcations" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
}

export default AdminNavbar;
