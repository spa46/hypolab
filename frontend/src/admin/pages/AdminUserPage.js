// src/admin/pages/AdminClusterPage.js
import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import ClusterTable from '../components/ClusterTable';
import config from '../../config';

const AdminClusterPage = () => {
  const [clusters, setClusters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch clusters from the API
    fetch(`${config.adminClusterUrl}`)
      .then(response => response.json())
      .then(data => setClusters(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRegister = (id) => {
    // Handle the register button click
    fetch(`${config.adminClusterUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(response => {
        if (response.status === 200) {
          setClusters(clusters.map(cluster =>
            cluster.id === id ? { ...cluster, is_registered: true } : cluster
          ));
        }
      })
      .catch(error => {
        console.error('Error registering cluster:', error);
      });
  };

  const handleToggleActive = (id) => {
    // Handle the active checkbox toggle
    setClusters(clusters.map(cluster =>
      cluster.id === id ? { ...cluster, is_active: !cluster.is_active } : cluster
    ));
  };

  const filteredClusters = clusters.filter(cluster =>
    cluster.id.toLowerCase().includes(search.toLowerCase()) ||
    cluster.name.toLowerCase().includes(search.toLowerCase()) ||
    cluster.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Clusters"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <ClusterTable
        clusters={filteredClusters}
        onRegister={handleRegister}
        onToggleActive={handleToggleActive}
      />
    </Container>
  );
};

export default AdminClusterPage;