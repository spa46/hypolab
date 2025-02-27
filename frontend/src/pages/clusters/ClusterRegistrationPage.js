import React, { useState } from 'react';
import axios from 'axios';

const ClusterRegisterPage = () => {
  const [clusterId, setClusterId] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { id: clusterId });
      alert('Cluster registered successfully');
    } catch (error) {
      alert('Failed to register cluster');
    }
  };

  return (
    <div>
      <h1>Register Cluster</h1>
      <input
        type="text"
        value={clusterId}
        onChange={(e) => setClusterId(e.target.value)}
        placeholder="Cluster ID"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default ClusterRegisterPage;