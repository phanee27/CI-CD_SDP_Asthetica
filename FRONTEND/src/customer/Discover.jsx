import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/Discover.css';
import all from '../assets/all.jpg';
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const isCustomerLoggedIn = sessionStorage.getItem("isCustomerLoggedIn") === "true";
  const userId = sessionStorage.getItem("userId");

  const handleCategoryClick = async (categoryValue) => {
    setSelectedCategory(categoryValue);
    try {
      const response = await axios.get(`${config.url}/customer/category`, {
        params: { category: categoryValue }
      });
      setArtworks(response.data);
      setError("");
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

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isCustomerLoggedIn || !userId) return;

      try {
        const response = await axios.get(`${config.url}/customer/wishlist/view/${userId}`);
        const wishlistItems = response.data; // Array of artworks in the wishlist
        const wishlistIds = wishlistItems.map(item => item.id);
        setAddedToWishlist(wishlistIds);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [isCustomerLoggedIn, userId]);

  const handleAddToWishlist = async (artworkId) => {
    if (!isCustomerLoggedIn || !userId) {
      console.log("User not logged in or userId missing:", { isCustomerLoggedIn, userId });
      navigate("/login");
      window.scrollTo(0, 0);
      return;
    }

    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      console.error("Invalid userId:", userId);
      alert("Invalid user ID. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      console.log("Adding to wishlist with data:", { userId: userIdNumber, artworkId });
      const response = await axios.post(`${config.url}/customer/wishlist/add`, {
        userId: userIdNumber,
        artworkId: artworkId
      });
      alert(response.data);
      if (!addedToWishlist.includes(artworkId)) {
        setAddedToWishlist([...addedToWishlist, artworkId]);
      }
    } catch (error) {
      console.error("Failed to add artwork to wishlist:", error.response?.data || error.message);
      alert(error.response?.data || "Failed to add artwork to wishlist");
    }
  };

  const handleBuyNow = (artworkId) => {
    if (!isCustomerLoggedIn) {
      navigate("/login");
      window.scrollTo(0, 0);
      return;
    }

    sessionStorage.setItem("artworks", JSON.stringify(artworks));
    navigate(`/view-product/${artworkId}`);
  };

  const categories = [
    { value: "POTRAIT", name: "Potrait", url: "https://i.pinimg.com/736x/ab/92/38/ab9238f8a6d8aa7658f1128ef641fb0e.jpg" },
    { value: "ABSTRACT", name: "Abstract", url: "https://texturetones.com/wp-content/uploads/2022/12/2-2.png" },
    { value: "LANDSCAPE", name: "Land Scape", url: "https://www.fineart.pub/wp-content/uploads/2021/05/landscape-painting.jpg" },
    { value: "HOLISTIC", name: "Holistic", url: "https://www.artzolo.com/cdn/shop/files/Lord-Krishna-ArtZolo-com-7611.jpg?v=1706738876&width=900" },
  ];

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">Artwork Categories</h2>
      <div className="artwork-category">
        <div style={{backgroundSize: 'cover',
            backgroundPosition: 'center', backgroundImage:`url(${all})`}}
          className="artwork-category-card all-artworks-card"
          onClick={() => handleCategoryClick("ALL")}
        >
          All Artworks
        </div>
        {categories.map((val, ind) => (
          <div
            key={ind}
            className="artwork-category-card"
            style={{ backgroundImage: `url(${val.url})` }}
            onClick={() => handleCategoryClick(val.value)}
          >
            {val.name}
          </div>
        ))}
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

                  <div>
                    <button
                      className="wishlist-button"
                      onClick={() => handleAddToWishlist(art.id)}
                      disabled={addedToWishlist.includes(art.id)}
                    >
                      {addedToWishlist.includes(art.id) ? "Added to Wishlist" : "Add to Wishlist"}
                    </button>
                    <button
                      className="buy-button"
                      onClick={() => handleBuyNow(art.id)}
                    >
                      Buy Now
                    </button>
                  </div>
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