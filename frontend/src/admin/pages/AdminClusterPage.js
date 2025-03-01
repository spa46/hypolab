// src/admin/pages/AdminClusterPage.js
import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import ClusterTable from '../components/ClusterTable';

const AdminClusterPage = () => {
  const [clusters, setClusters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch clusters from the API
    fetch('/api/clusters')
      .then(response => response.json())
      .then(data => setClusters(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredClusters = clusters.filter(cluster =>
    cluster.id.toLowerCase().includes(search.toLowerCase()) ||
    cluster.status.toLowerCase().includes(search.toLowerCase())
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
      <ClusterTable clusters={filteredClusters} />
    </Container>
  );
};

export default AdminClusterPage;