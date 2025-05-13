import React from 'react';
import { Card, CardContent, CardOverflow, Typography, AspectRatio } from '@mui/joy';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const ArtworkCard = ({ art }) => {
  const navigate = useNavigate();
  const handleClick = (artid) => {
    navigate(`/edit/${artid}`)
  }
   return (
    <div style={styles.card}>
      <img src={art.image} alt={art.title} style={styles.image} />

      <div style={styles.badge}>
        <span>{art.status || 'Unavailable'}</span>
      </div>

      <div style={styles.footer}>
        <div style={styles.info}>
          <div style={styles.title}>{art.title}</div>
          <div style={styles.description}>
            {art.description.length > 60 ? `${art.description.slice(0, 60)}...` : art.description}
          </div>
          <div style={styles.dimensions}>
            {art.width} x {art.height} cm
          </div>
          <div style={styles.price}>₹{art.price}</div>
        </div>
        {/* <button style={styles.button}>Edit</button> */}
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    width: '300px',
    height: '400px',
    borderRadius: '25px',
    overflow: 'hidden',
    background: '#f0f0f3',
    boxShadow: '10px 10px 30px #d1d9e6, -10px -10px 30px #ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '4px solid #ffffff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  image: {
    height: '70%',
    width: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff',
    color: '#333',
    fontWeight: 600,
  },
  footer: {
    padding: '1rem',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '14px',
    opacity: 0.8,
    margin: '4px 0',
  },
  dimensions: {
    fontSize: '13px',
    color: '#777',
  },
  price: {
    fontSize: '16px',
    color: '#27ae60',
    fontWeight: '600',
  },
  button: {
    background: '#ffffff',
    color: '#333',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '999px',
    boxShadow: '2px 2px 8px #d1d9e6, -2px -2px 8px #ffffff',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
};

export default ArtworkCard;
