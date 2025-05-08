import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/Discover.css'; // Assuming you have separate styles for Discover
import all from '../assets/all.jpg'

const Discover = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState([]); // Track added artworks
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage after login

  const handleCategoryClick = async (categoryValue) => {
    setSelectedCategory(categoryValue);  // Highlight selected category (optional)
    try {
      const response = await axios.get(`${config.url}/customer/category`, {
        params: { category: categoryValue }
      });
      setArtworks(response.data);  // Replace artworks with filtered list
      setError("");  // Clear previous errors
    } catch (err) {
      console.error("Error fetching by category:", err);
      setError("Unable to filter artworks by category");
    }
  };
  

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
  
  const categories = [
    {value:"POTRAIT",name:"Potrait", url:"https://i.pinimg.com/736x/ab/92/38/ab9238f8a6d8aa7658f1128ef641fb0e.jpg"},
    {value:"ABSTRACT",name:"Abstract", url:"https://texturetones.com/wp-content/uploads/2022/12/2-2.png"},
    {value:"LANDSCAPE",name:"Land Scape", url:"https://www.fineart.pub/wp-content/uploads/2021/05/landscape-painting.jpg"},
    {value:"HOLISTIC",name:"Holistic", url:"https://www.artzolo.com/cdn/shop/files/Lord-Krishna-ArtZolo-com-7611.jpg?v=1706738876&width=900"},
  ]

  return (
    <div className="artwork-container">
        <h2 className="artwork-title">Artwork Categories</h2>
        <div className="artwork-category">
        <div className="artwork-category-card" 
            style={{backgroundSize: 'cover',
            backgroundPosition: 'center', backgroundImage:`url(${all})`}}
            onClick={()=>handleCategoryClick("ALL")}>
          All Artworks
        </div>
        {
          
          categories.map((val, ind) => (
            <div key={ind} className="artwork-category-card" 
            style={{backgroundImage:`url(${val.url})`,backgroundSize: 'cover',
            backgroundPosition: 'center'}}
            onClick={() => handleCategoryClick(val.value)}>
              {val.name}
            </div>
          ))
        }

        </div>
        <div>
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
    </div>
  );
};

export default Discover;
