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
    
    </>

  );
};

export default ViewProduct;
