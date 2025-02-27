import React, { useState } from 'react';
import axios from 'axios';

const ClusterControlPage = () => {
  const [clusterId, setClusterId] = useState('');

  const handleControl = async () => {
    try {
      const response = await axios.put('/control', { id: clusterId });
      alert('Cluster control command sent');
    } catch (error) {
      alert('Failed to send control command');
    }
  };

  return (
    <div>
      <h1>Control Cluster</h1>
      <input
        type="text"
        value={clusterId}
        onChange={(e) => setClusterId(e.target.value)}
        placeholder="Cluster ID"
      />
      <button onClick={handleControl}>Control</button>
    </div>
  );
};

export default ClusterControlPage;