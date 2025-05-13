import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import "./styles/MyArtWork.css";

const HostAnAuction = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [minIncrement, setMinIncrement] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "SELLER") {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${config.url}/seller/myartworks`, {
          params: { artistId: user.id },
        });

        if (response.status === 200) {
          setArtworks(response.data);
        } else {
          setError("Failed to fetch artworks");
        }
      } catch (err) {
        console.error("Axios fetch error:", err);
        setError("Error fetching artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setStartTime("");
    setEndTime("");
    setStartingBid("");
    setMinIncrement("");
    setSubmitMessage("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArtwork(null);
  };

  const handleAuctionSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(`${config.url}/seller/request`, {
        startTime,
        endTime,
        startingBid: parseFloat(startingBid),
        minIncrement: parseFloat(minIncrement),
        artwork: {
          id: selectedArtwork.id,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitMessage("Auction hosted successfully!");
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setSubmitMessage("An error occurred while hosting the auction.");
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage(
        err.response?.data?.message || "An error occurred while hosting the auction."
      );
    }
  };

  if (loading) {
    return <div className="artwork-container"><p>Loading artworks...</p></div>;
  }

  if (error) {
    return <div className="artwork-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">My Artworks (Host Auction)</h2>

      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {artworks.map((art) => (
            <div key={art.id} className="artwork-card">
              <img src={art.image} alt={art.title} className="artwork-image" />
              <div className="artwork-badge">
                <span>{art.status || "Unavailable"}</span>
              </div>
              <div className="artwork-footer">
                <div className="artwork-info">
                  <div className="artwork-title-text">{art.title}</div>
                  <div className="artwork-description">
                    {art.description?.length > 60
                      ? `${art.description.slice(0, 60)}...`
                      : art.description || "No description available"}
                  </div>
                  <div className="artwork-price">₹{art.price}</div>
                </div>
                <button onClick={() => openModal(art)} className="host-btn">Host an Auction
                  <span className="host-btn-icon">↑</span> 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={closeModal} className="modal-close-btn">
              ×
            </button>
            <h3>Host Auction for "{selectedArtwork?.title}"</h3>
            <form onSubmit={handleAuctionSubmit} className="modal-form">
              <label className="modal-label">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="modal-input"
                required
              />

              <label className="modal-label">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="modal-input"
                required
              />

              <label className="modal-label">Starting Bid (₹)</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="modal-input"
                required
              />

              <label className="modal-label">Minimum Increment (₹)</label>
              <input
                type="number"
                value={minIncrement}
                onChange={(e) => setMinIncrement(e.target.value)}
                className="modal-input"
                required
              />

              <button type="submit" className="submit-btn">
                <span className="submit-btn-icon">↑</span> Submit
              </button>
              {submitMessage && (
                <p className="submit-message">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostAnAuction;