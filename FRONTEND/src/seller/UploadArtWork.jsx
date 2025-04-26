import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../config';
// import './styles/UploadArtwork.css'

const UploadArtwork = () => {
  const [artwork, setArtwork] = useState({
    title: '',
    artist: '',  // This will be automatically filled with the logged-in user's name.
    description: '',
    price: ''
  });
  const [artworkImage, setArtworkImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Fetch logged-in user data from localStorage or sessionStorage
  useEffect(() => {
    // Assuming user info is stored in localStorage after login
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // or sessionStorage.getItem('user')


    if (loggedInUser) {
      setUser(loggedInUser);
      setArtwork(prev => ({ ...prev, artist: loggedInUser.username })); // Automatically set the artist name to logged-in user's username
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to upload artwork.");
      return;
    }

    // Check if all required fields are filled
    if (!artwork.title || !artwork.description || !artwork.price || !artworkImage) {
      setError("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('artworkImage', artworkImage);
    formData.append('title', artwork.title);
    formData.append('artist', artwork.artist); // Artist is set to the logged-in user's username
    formData.append('description', artwork.description);
    formData.append('price', artwork.price);
    formData.append('artistId', user.id); // Send the user ID to associate the artwork with the user

    console.log('Form data being submitted:', formData); // Debug log to see form data

    try {
      const response = await axios.post(`${config.url}/seller/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from server:', response.data); // Debug log to check server response
      setMessage(response.data);
      setError("");

      // Clear form fields after successful submission
      setArtwork({
        title: '',
        artist: '',
        description: '',
        price: ''
      });
      setArtworkImage(null);

    } catch (error) {
      console.error('Error uploading artwork:', error); // Debug log for errors
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
          <label>Artwork Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Upload Artwork</button>
      </form>
    </div>
  );
};

export default UploadArtwork;
