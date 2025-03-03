import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClusterTable from '../components/ClusterTable';
import EditClusterDialog from '../components/EditClusterDialog';
import config from '../../config';

const AdminClusterPage = () => {
  const [clusters, setClusters] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState({});

  useEffect(() => {
    fetch(`${config.clusterUrl}/admin/`)
      .then(response => response.json())
      .then(data => setClusters(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRegister = (id) => {
    const cluster = clusters.find(cluster => cluster.id === id);
    if (!cluster.name) {
      toast.error('Insert Name');
      return;
    }

    fetch(`${config.clusterUrl}/init-cluster/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: id }),
    })
      .then(response => {
        if (response.status === 200) {
          setClusters(clusters.map(cluster =>
            cluster.id === id ? { ...cluster, is_registered: true } : cluster
          ));
          setRegistrationStatus(prevStatus => ({
            ...prevStatus,
            [id]: 'Registered'
          }));
        }
      })
      .catch(error => {
        console.error('Error registering cluster:', error);
      });
  };

  const handleToggleActive = (id) => {
    setClusters(clusters.map(cluster =>
      cluster.id === id ? { ...cluster, is_active: !cluster.is_active } : cluster
    ));
  };

  const handleRowClick = (cluster) => {
    setSelectedCluster(cluster);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = (updatedCluster) => {
    setClusters(clusters.map(cluster =>
      cluster.id === updatedCluster.id ? updatedCluster : cluster
    ));
    setIsDialogOpen(false);
  };

  const handleDelete = (ids) => {
    fetch(`${config.clusterUrl}/admin/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    })
      .then(response => {
        if (response.status === 200) {
          setClusters(clusters.filter(cluster => !ids.includes(cluster.id)));
        }
      })
      .catch(error => {
        console.error('Error deleting clusters:', error);
      });
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
        onRowClick={handleRowClick}
        onDelete={handleDelete}
        registrationStatus={registrationStatus}
      />
      {selectedCluster && (
        <EditClusterDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          cluster={selectedCluster}
          onSave={handleSave}
        />
      )}
      <ToastContainer />
    </Container>
  );
};

export default AdminClusterPage;