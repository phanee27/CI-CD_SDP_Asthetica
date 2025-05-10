import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const PoppinsTypography = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
});

const ViewProduct = () => {
  const { id } = useParams();
  const artworks = JSON.parse(sessionStorage.getItem("artworks")) || [];
  if (!Array.isArray(artworks)) {
    return <PoppinsTypography variant="h6">Loading artwork details...</PoppinsTypography>;
  }

  const painting = artworks.find((art) => art.id.toString() === id);

  if (!painting) {
    return <PoppinsTypography variant="h6">Artwork not found.</PoppinsTypography>;
  }

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={6}>
        <img
          src={painting.image}
          alt={painting.title}
          style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <PoppinsTypography variant="h4" gutterBottom>{painting.title}</PoppinsTypography>
            <PoppinsTypography variant="subtitle1" color="textSecondary">By: {painting.artist}</PoppinsTypography>
            <PoppinsTypography variant="h5" color="green" sx={{ mt: 2 }}>₹{painting.price.toLocaleString()}</PoppinsTypography>
            <PoppinsTypography variant="body1" sx={{ mt: 2 }}>{painting.description}</PoppinsTypography>
            <PoppinsTypography variant="body2" sx={{ mt: 2 }}>Dimensions: {painting.height} x {painting.width} cm</PoppinsTypography>
            <PoppinsTypography variant="body2" sx={{ mt: 1 }}>Category: {painting.category}</PoppinsTypography>
            <PoppinsTypography variant="body2" sx={{ mt: 1 }}>Status: <strong>{painting.status}</strong></PoppinsTypography>
            <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2, fontWeight: 'bold' }}>
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewProduct;
