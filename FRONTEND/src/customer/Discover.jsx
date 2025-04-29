import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/Discover.css'; // Assuming you have separate styles for Discover

const Discover = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState([]); // Track added artworks

  const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage after login

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

    fetchAllArtworks();
  }, []);

  const handleAddToWishlist = async (artworkId) => {
    const user = JSON.parse(localStorage.getItem("user"));  // Retrieve user data from localStorage
    const userId = user ? user.id : null;  // Get the userId, default to null if not found
  
    if (!userId) {
      alert("Please log in first.");
      return;
    }
  
    try {
      const response = await axios.post(`${config.url}/customer/wishlist/add`, null, {
        params: {
          userId: userId,
          artworkId: artworkId
        }
      });
      alert(response.data);  // Show success message
    } catch (error) {
      console.error("Failed to add artwork to wishlist:", error);
      alert("Failed to add artwork to wishlist");
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

                <button
                  className="wishlist-button"
                  onClick={() => handleAddToWishlist(art.id)}
                  disabled={addedToWishlist.includes(art.id)} // disable after adding
                >
                  {addedToWishlist.includes(art.id) ? "Added to Wishlist" : "Add to Wishlist"}
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
