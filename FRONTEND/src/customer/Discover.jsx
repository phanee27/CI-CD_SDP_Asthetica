import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/Discover.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Discover = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  // Fetch artworks and wishlist
  useEffect(() => {
    const fetchAllArtworks = async () => {
      try {
        const response = await axios.get(`${config.url}/customer/viewallartworks`);
        setArtworks(response.data);
      } catch (err) {
        setError("Failed to fetch artworks");
        console.error(err);
      }
    };

    const fetchWishlist = async () => {
      if (!userId) return; // If not logged in, skip
      try {
        const response = await axios.get(`${config.url}/customer/wishlist/view/${userId}`); // Updated URL with path variable
        const wishlistArtworkIds = response.data.map(item => item.artworkId);
        setAddedToWishlist(wishlistArtworkIds); // ✅ set existing wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlistArtworkIds)); // Store in localStorage
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };

    fetchAllArtworks();
    fetchWishlist();
  }, [userId]);

  const handleAddToWishlist = async (artworkId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
  
    if (!userId) {
      toast.error("Please log in first.");
      return;
    }
  
    // Check if the artwork is already in the wishlist
    if (addedToWishlist.includes(artworkId)) {
      toast.info("Artwork is already in your wishlist.");
      return; // No need to make the request if it's already added
    }
  
    try {
      const response = await axios.post(`${config.url}/customer/wishlist/add`, null, {
        params: {
          userId: userId,
          artworkId: artworkId,
        },
      });
  
      toast.success(response.data); // Backend success message
      setAddedToWishlist((prevState) => {
        const updatedWishlist = [...prevState, artworkId];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Store updated wishlist in localStorage
        return updatedWishlist;
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
  
      // Handle if the artwork is already in the wishlist on the backend
      if (error.response && error.response.data) {
        toast.error(error.response.data); // Show backend message (ex: "Artwork already in wishlist")
      } else {
        toast.error("Failed to add artwork to wishlist.");
      }
    }
  };

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">Discover Artworks</h2>

      {error && <p className="error-message">{error}</p>}

      {artworks.length === 0 ? (
        <p>No artworks available.</p>
      ) : (
        <div className="artwork-grid">
          {artworks.map((art) => (
            <div key={art.id} className="artwork-card">
              <img
                src={art.image}
                alt={art.title}
                className="artwork-image"
              />
              <div className="artwork-card-body">
                <h3 className="artwork-card-title">{art.title}</h3>
                <p className="artwork-description">{art.description}</p>
                <p className="artwork-price">₹{art.price}</p>
                <p className="artwork-dimensions">
                  {art.width} x {art.height} cm
                </p>
                <p className="artwork-status">
                  Status: {art.status ? art.status : "Unavailable"}
                </p>

                {/* Add to Wishlist Button */}
                <button
                  className="wishlist-button"
                  onClick={() => handleAddToWishlist(art.id)}
                >
                  {addedToWishlist.includes(art.id) ? "Added to Wishlist" : "Add to Wishlist"}
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-center" autoClose={800} />
    </div>
  );
};

export default Discover;
