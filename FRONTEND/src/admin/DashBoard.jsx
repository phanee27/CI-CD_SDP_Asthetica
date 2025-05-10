import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import {Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashBoard() {
  const [buyerCount, setbuyerCount] = useState(0);
  const [sellerCount, setsellerCount] = useState(0);
  const [artworkCount, setartworkCount] = useState(0);

  const COLORS = ['#28a745', '#007bff', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8', '#fd7e14'];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const buyerRes = await axios.get(`${config.url}/admin/buyercount`);
        const sellerRes = await axios.get(`${config.url}/admin/sellercount`);
        const artworkRes = await axios.get(`${config.url}/admin/artworkcount`);

        setbuyerCount(buyerRes.data);
        setsellerCount(sellerRes.data);
        setartworkCount(artworkRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const data = [
    { name: 'Customers', count: buyerCount },
    { name: 'Sellers', count: sellerCount },
    { name: 'Artworks', count: artworkCount },
  ];

  return (
    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2>Welcome to Admin Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Customers</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>{buyerCount}</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Sellers</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{sellerCount}</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Artworks</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff5722' }}>{artworkCount}</p>
        </div>
      </div>

      {/* Add Bar Chart */}
      <div style={{ marginTop: '50px', width: '100%', height: '400px' }}>
        <ResponsiveContainer width="35%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
