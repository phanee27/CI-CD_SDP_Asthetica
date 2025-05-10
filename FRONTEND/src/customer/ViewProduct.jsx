import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

const PoppinsTypography = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
});

const ViewProduct = () => {
  const [artist, setArtist] = useState(''); // Hook 1
  const [artworks, setArtworks] = useState([]); // Hook 2
  const { id } = useParams(); // Hook 3
  const username = localStorage.getItem('username');
  let isCustomerLoggedIn = sessionStorage.getItem('isCustomerLoggedIn') === 'true';

  // Fallback: If isCustomerLoggedIn is not set in sessionStorage, infer from username
  if (!isCustomerLoggedIn && username) {
    isCustomerLoggedIn = true;
    sessionStorage.setItem('isCustomerLoggedIn', 'true');
  }

  // Hook 4: Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const storedArtworks = JSON.parse(sessionStorage.getItem('artworks'));
        if (storedArtworks && Array.isArray(storedArtworks)) {
          setArtworks(storedArtworks);
        } else {
          const response = await axios.get(`${config.url}/artworks`);
          const fetchedArtworks = response.data;
          sessionStorage.setItem('artworks', JSON.stringify(fetchedArtworks));
          setArtworks(fetchedArtworks);
        }
      } catch (err) {
        toast.error('Failed to load artworks.');
      }
    };

    fetchArtworks();
  }, []);

  const painting = artworks.find((art) => art.id.toString() === id);

  // Hook 5: Fetch artist (moved before early returns)
  useEffect(() => {
    if (!painting) return; // Skip if painting is not found

    const handleArtist = async (artistId) => {
      try {
        const response = await axios.get(`${config.url}/user/getusername/${artistId}`);
        setArtist(response.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    handleArtist(painting.artistId);
  }, [painting?.artistId]); // Use optional chaining to handle undefined painting

  // Early returns (now after all hooks)
  if (!Array.isArray(artworks) || artworks.length === 0) {
    return <PoppinsTypography variant="h6">Loading artwork details...</PoppinsTypography>;
  }

  if (!painting) {
    return <PoppinsTypography variant="h6">Artwork not found.</PoppinsTypography>;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    if (!isCustomerLoggedIn || !username) {
      toast.error('Please log in to proceed with purchase.');
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error('Failed to load Razorpay SDK.');
      return;
    }

    try {
      const orderRes = await axios.post(
        `${config.url}/api/payment/create-order/${id}?username=${username}&amount=${painting.price}`
      );
      const { orderId, amount, currency } = orderRes.data;

      const options = {
        key: 'rzp_test_rwXqAuEXwJyhk5',
        amount,
        currency,
        name: 'Asthetica',
        description: painting.title,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              username,
              artwork_id: id,
            };

            const verifyRes = await axios.post(`${config.url}/api/payment/verify`, verifyPayload);

            if (verifyRes.data === 'Payment verified') {
              toast.success('Payment successful!');
            } else {
              toast.error('Payment verification failed!');
            }
          } catch (err) {
            toast.error('Verification failed. Try again.');
          }
        },
        prefill: {
          name: username,
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Payment initiation failed.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '2rem auto',
        border: '2px solid #ccc',
        borderRadius: '12px',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '400px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={painting.image}
          alt={painting.title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <PoppinsTypography variant="h4" gutterBottom>
          {painting.title}
        </PoppinsTypography>
        <PoppinsTypography variant="subtitle1" color="textSecondary">
          By: {artist}
        </PoppinsTypography>
        <PoppinsTypography variant="h5" color="green" sx={{ mt: 2 }}>
          ₹{painting.price.toLocaleString()}
        </PoppinsTypography>
        <PoppinsTypography variant="body1" sx={{ mt: 2 }}>
          {painting.description}
        </PoppinsTypography>
        <PoppinsTypography variant="body2" sx={{ mt: 2 }}>
          Dimensions: {painting.height} x {painting.width} cm
        </PoppinsTypography>
        <PoppinsTypography variant="body2" sx={{ mt: 1 }}>
          Category: {painting.category}
        </PoppinsTypography>
        <PoppinsTypography variant="body2" sx={{ mt: 1 }}>
          Status: <strong>{painting.status}</strong>
        </PoppinsTypography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, borderRadius: 2, fontWeight: 'bold' }}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ViewProduct;