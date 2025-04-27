import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../config';
import './styles/UploadArtwork.css';

const UploadArtwork = () => {
  const [artwork, setArtwork] = useState({
    title: '',
    artist: '',
    description: '',
    price: '',
    imageUrl: '',  // NEW: will store the Cloudinary image URL here
    width: '',     // NEW: width of the artwork
    height: '',    // NEW: height of the artwork
    status: 'AVAILABLE'  // NEW: status of the artwork (default as AVAILABLE)
  });
  const [artworkImage, setArtworkImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Fetch logged-in user data
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setArtwork(prev => ({ ...prev, artist: loggedInUser.username }));
    } else {
      setError("You must be logged in to upload artwork.");
    }
  }, []);

  const handleChange = (e) => {
    setArtwork({ ...artwork, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setArtworkImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'vvz5zgoz'); // your unsigned preset name
    data.append('cloud_name', 'dgmk3fhuz'); // <-- replace with your actual Cloudinary cloud name

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dgmk3fhuz/image/upload', data);
      return res.data.secure_url; // get the HTTPS URL
    } catch (err) {
      console.error('Error uploading image to Cloudinary:', err);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      setError("You must be logged in to upload artwork.");
      return;
    }
  
    if (!artwork.title || !artwork.description || !artwork.price || !artwork.width || !artwork.height || !artworkImage) {
      setError("Please fill out all fields and upload an image.");
      return;
    }
  
    try {
      const imageUrl = await uploadImageToCloudinary(artworkImage);
  
      const newArtwork = {
        title: artwork.title,
        description: artwork.description,
        price: parseFloat(artwork.price),
        artistId: user.id,
        image: imageUrl,   // NOTE the name change here
        width: parseFloat(artwork.width),
        height: parseFloat(artwork.height),
        status: artwork.status  // Sending the status
      };
  
      const response = await axios.post(`${config.url}/seller/upload`, newArtwork, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Response from server:', response.data);
      setMessage(response.data);
      setError("");
  
      setArtwork({
        title: '',
        artist: '',
        description: '',
        price: '',
        imageUrl: '',
        width: '',
        height: '',
        status: 'AVAILABLE'
      });
      setArtworkImage(null);
  
    } catch (error) {
      console.error('Error uploading artwork:', error);
      setMessage("");
      setError(error.message || "An error occurred while uploading artwork.");
    }
  };
  

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Upload Artwork</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Title:</label>
          <input type="text" className="form-control" name="title" value={artwork.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Artist:</label>
          <input type="text" className="form-control" name="artist" value={artwork.artist} disabled />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea className="form-control" name="description" rows="3" value={artwork.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input type="number" step="0.01" className="form-control" name="price" value={artwork.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Width:</label>
          <input type="number" step="0.01" className="form-control" name="width" value={artwork.width} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Height:</label>
          <input type="number" step="0.01" className="form-control" name="height" value={artwork.height} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Status:</label>
          <select className="form-control" name="status" value={artwork.status} onChange={handleChange}>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Artwork Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Upload Artwork</button>
      </form>
    </div>
  );
};

export default UploadArtwork;
