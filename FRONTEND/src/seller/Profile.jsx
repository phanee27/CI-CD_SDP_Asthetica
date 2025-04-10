import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useAuth } from '../contextapi/AuthContext';
import { TextField, Button } from '@mui/material';
// import './styles/Profile.css';

const Profile = () => {
  const { username } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    contact: "",
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.put(`${config.url}/user/updateprofile`, formData);
      if (response.status === 200) {
        setMessage("Profile updated successfully.");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error updating profile.");
      } else {
        setError("Unexpected Error");
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${config.url}/user/getprofile?username=${username}`);
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          setMessage("Failed to load profile.");
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || "Error fetching profile.");
        } else {
          setError("Unexpected Error");
        }
      }
    };

    fetchProfile();
  }, [username]);

  return (
    <div className="profile-form">
      <center><h2>User Profile</h2></center>
      { 
        error?
        <center>{error && <p className="error" color='red'>{error}</p>}</center>:
        <div>
          <center>{message && <p className="message" color='light-green'>{message}</p>}</center>
          <form className="form-control" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <TextField id="name" variant="filled" value={formData.name} onChange={handleChange} />
  
          <label htmlFor="email">Email</label>
          <TextField id="email" variant="filled" value={formData.email} onChange={handleChange} />
  
          <label htmlFor="role">Role</label>
          <TextField id="role" variant="filled" value={formData.role} disabled />
  
          <label htmlFor="contact">Contact</label>
          <TextField id="contact" variant="filled" value={formData.contact} onChange={handleChange} />
  
          <div className="form-btn">
            <Button variant="outlined" type="button">Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </div>
        </form>
        </div>
      }
    </div>
  );
};

export default Profile;
