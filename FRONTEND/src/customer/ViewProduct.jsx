import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, CardContent, Typography, Grid, Card } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

const PoppinsTypography = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
});

const ViewProduct = () => {
  const [artist, setArtist] = useState('');
  const { id } = useParams();
  const artworks = JSON.parse(sessionStorage.getItem('artworks')) || [];

  if (!Array.isArray(artworks)) {
    return <PoppinsTypography variant="h6">Loading artwork details...</PoppinsTypography>;
  }

  const painting = artworks.find((art) => art.id.toString() === id);

  if (!painting) {
    return <PoppinsTypography variant="h6">Artwork not found.</PoppinsTypography>;
  }

  useEffect(() => {
    const handleArtist = async (artistId) => {
      try {
        const response = await axios.get(`${config.url}/user/getusername/${artistId}`);
        setArtist(response.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    handleArtist(painting.artistId);
  }, [painting.artistId]);

  return (
    <>
      <div style={{ 
  display: 'flex', 
  maxWidth: '1200px', 
  margin: '2rem auto', 
  border: '2px solid #ccc', 
  borderRadius: '12px',
  padding: '1rem',
  boxSizing: 'border-box'
}}>
  {/* Left: Image */}
  <div style={{ 
    width: '400px', 
    flexShrink: 0, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <img 
      src={painting.image} 
      alt={painting.title} 
      style={{ 
        maxWidth: '100%', 
        height: 'auto', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
      }} 
    />
  </div>

  {/* Right: Description */}
  <div style={{ 
    flex: 1, 
    marginLeft: '2rem', 
    backgroundColor: 'white', 
    borderRadius: '12px', 
    padding: '2rem', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' 
  }}>
    <PoppinsTypography variant="h4" gutterBottom>{painting.title}</PoppinsTypography>
    <PoppinsTypography variant="subtitle1" color="textSecondary">By: {artist}</PoppinsTypography>
    <PoppinsTypography variant="h5" color="green" sx={{ mt: 2 }}>₹{painting.price.toLocaleString()}</PoppinsTypography>
    <PoppinsTypography variant="body1" sx={{ mt: 2 }}>{painting.description}</PoppinsTypography>
    <PoppinsTypography variant="body2" sx={{ mt: 2 }}>Dimensions: {painting.height} x {painting.width} cm</PoppinsTypography>
    <PoppinsTypography variant="body2" sx={{ mt: 1 }}>Category: {painting.category}</PoppinsTypography>
    <PoppinsTypography variant="body2" sx={{ mt: 1 }}>Status: <strong>{painting.status}</strong></PoppinsTypography>
    <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2, fontWeight: 'bold' }}>
      Buy Now
    </Button>
  </div>
</div>

    </>

  );
};

export default ViewProduct;
