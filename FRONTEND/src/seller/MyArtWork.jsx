import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
// import './styles/MyArtWork.css'


const MyArtWork = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "SELLER") {
      setError("Unauthorized access");
      return;
    }

    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${config.url}/seller/myartworks`, {
          params: { artistId: user.id },
        });
        setArtworks(response.data);
      } catch (err) {
        setError("Failed to fetch artworks");
        console.error(err);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">My Artworks</h2>

      {error && <p className="error-message">{error}</p>}

      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <div className="artwork-grid">
          {artworks.map((art) => (
            <div key={art.id} className="artwork-card">
              <img
                src={`${config.url}/seller/displayartworkimage?id=${art.id}`} // Assuming this URL fetches the image
                alt={art.title}
                className="artwork-image"
              />
              <div className="artwork-card-body">
                <h3 className="artwork-card-title">{art.title}</h3>
                <p className="artwork-description">{art.description}</p>
                <p className="artwork-price">₹{art.price}</p>
                {/* <p className="artwork-status">Status: {art.status}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtWork;
